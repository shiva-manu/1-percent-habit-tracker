import datetime
import os
from pymongo import MongoClient
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Define Google Calendar API scope
SCOPES = ["https://www.googleapis.com/auth/calendar"]

def authenticate():
    """Authenticates and returns the Google Calendar API service."""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return build("calendar", "v3", credentials=creds)

def delete_events_of_day(service, date):
    """Deletes all events on the given date."""
    start_of_day = datetime.datetime.combine(date, datetime.time.min).isoformat() + "Z"
    end_of_day = datetime.datetime.combine(date, datetime.time.max).isoformat() + "Z"
    events_result = service.events().list(
        calendarId="primary",
        timeMin=start_of_day,
        timeMax=end_of_day,
        singleEvents=True,
        orderBy="startTime"
    ).execute()
    
    events = events_result.get("items", [])
    for event in events:
        try:
            service.events().delete(calendarId="primary", eventId=event["id"]).execute()
            print(f"Deleted event: {event['summary']}")
        except HttpError as error:
            print(f"An error occurred while deleting event: {error}")

def parse_time(date, time_str):
    """Parses a time string and returns a datetime object."""
    # Add space between time and AM/PM if missing
    time_str = time_str.replace("AM", " AM").replace("PM", " PM")
    
    # Now, ensure that the time_str is formatted correctly
    time_str = time_str.strip()  # Remove leading or trailing spaces
    
    if "-" in time_str:
        start_str, end_str = time_str.split(" - ")
        start_time = datetime.datetime.strptime(f"{date} {start_str}", "%Y-%m-%d %I:%M %p")
        end_time = datetime.datetime.strptime(f"{date} {end_str}", "%Y-%m-%d %I:%M %p")
        return start_time.isoformat() + "Z", end_time.isoformat() + "Z"
    else:
        start_time = datetime.datetime.strptime(f"{date} {time_str}", "%Y-%m-%d %I:%M %p")
        end_time = start_time + datetime.timedelta(minutes=30)
        return start_time.isoformat() + "Z", end_time.isoformat() + "Z"


def create_event(service, name, start_time, end_time):
    """Creates a new event in Google Calendar."""
    event = {
        "summary": name,
        "start": {
            "dateTime": start_time,
            "timeZone": "UTC",
        },
        "end": {
            "dateTime": end_time,
            "timeZone": "UTC",
        },
    }
    try:
        event_result = service.events().insert(calendarId="primary", body=event).execute()
        print(f"Created event: {event_result.get('htmlLink')}")
    except HttpError as error:
        print(f"An error occurred: {error}")

def update_calendar_with_mongodb_data(service, events):
    """Deletes existing events and adds new ones from MongoDB."""
    today_date = datetime.date.today()
    delete_events_of_day(service, today_date)

    # Loop through events and add them to Google Calendar
    for event in events:
        start_time, end_time = parse_time(today_date, event["time"])
        create_event(service, event["name"], start_time, end_time)

def main():
    # Connect to MongoDB
    uri = "mongodb+srv://galishivamani49:Z0axU6A1qVDwemHK@cluster0.sip2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(uri)
    db = client["haabit_tracker"]  # Replace with your database name
    collection = db["tasks"]

    # Fetch the document with tasks
    data = collection.find()
    tasks = data[0]['tasks'] # Retrieve the list of tasks

    # Authenticate with Google Calendar and update events
    service = authenticate()
    update_calendar_with_mongodb_data(service, tasks)

if __name__ == "__main__":
    main()