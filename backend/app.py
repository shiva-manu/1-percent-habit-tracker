from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from pymongo import MongoClient
import json
import quickstart
# import demp

connection_string = ""
client = MongoClient(connection_string)
db = client["haabit_tracker"]
collection = db["tasks"]
data = collection.find()
tasks = data[0]['tasks']
#Llaama API


app = Flask(__name__)
CORS(app)
@app.route("/receivedata", methods=['POST'])
def receive_data():
    data = request.json  # Get JSON data sent from React
    print("Data received from React:", data)  # Print data to console
    return jsonify({"message": "Data received successfully"}), 200


# x = f"{tasks} is my schedule but i got a sudden work, that is {reschedule}. so reschedule my day. give only json as output no other format is allowed,no json word in the sarting no qoutes in the start and end ."
# response = client.chat.completions.create(
#     model='Meta-Llama-3.1-8B-Instruct',
#     messages=[{"role":"user","content":[{"type":"text","text":x}]}],
#     temperature =  0.1,
#     top_p = 0.1
# )
# val = response.choices[0].message.content

@app.route('/api/prompt/', methods=['POST'])
def prompt():
    print(request.json['prompt'])
    prmpt(request.json['prompt'])
    get_habits()
    

    return jsonify({"message": "Data received and updated successfully"}), 200



@app.route('/api/get_habits', methods=['GET'])
def get_habits():
    
    connection_string = ""
    client = MongoClient(connection_string)
    db = client["haabit_tracker"]
    collection = db["tasks"]
    data = collection.find()
    tasks1 = data[0]['tasks']
    print(tasks1)
    # Return the habits data as JSON
    return tasks1

@app.route('/api/habits/attention',methods=['GET'])
def attention():
    connection_string = ""
    client = MongoClient(connection_string)
    db2 = client["haabit_tracker"]  # Replace with your database name
    collection2 = db2["habits"]     # Replace with your collection name
    # Fetch all documents in the collection
    habits_data = collection2.find()
    all = []
    # Print each document in the collection
    for habit in habits_data:
        all.append(habit)
    client = openai.OpenAI(
        api_key="",
        base_url="https://api.sambanova.ai/v1",
    )    
    x2 = f"From the  data provided, identify 2 tasks that require attention and 2 tasks that are being done well. Provide a detailed reason for each and suggest improvements. Output strictly in JSON format with no introductory text, quotes, or additional notes outside of the JSON structure. {all}"
    response2 = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=[{"role":"user","content":[{"type":"text","text":x2}]}],
        temperature =  0.1,
        top_p = 0.1
        )
    x2 = response2.choices[0].message.content
    print(x2)

        
    y2 = json.loads(x2)
    return y2

def prmpt(resc):
    
    connection_string = ""
    client = MongoClient(connection_string)
    db = client["haabit_tracker"]
    collection = db["tasks"]
    data = collection.find()
    tasks = data[0]['tasks']

    # OpenAI API setup
    client = openai.OpenAI(
        api_key="",
        base_url="https://api.sambanova.ai/v1",
    )

    # Ask user if they want to reschedule
    reschedule = resc

    # Construct the prompt for the LLaMA model
    x = f"{tasks} is my schedule but i got a sudden work, that is {reschedule}. so reschedule my day. give only json as output no other format is allowed, no json word in the starting no quotes in the start and end."

    # Call OpenAI API
    response = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=[{"role":"user","content":x}],
        temperature=0.1,
        top_p=0.1
    )

    # Extract the response text
    json_text = response.choices[0].message.content

    # Fix the format of the JSON-like string from LLaMA's response
    json_ready_text = json_text.replace("'", '"')  # Convert single quotes to double quotes

    # Parse the text into a Python dictionary
    try:
        updated_schedule = json.loads(json_ready_text)
        print("Updated Schedule:", updated_schedule)

        # Now, update MongoDB with the new schedule
        filter = {"_id": data[0]['_id']}  # Assuming you want to update the first document
        result = collection.replace_one(filter, {"tasks": updated_schedule})

        if result.matched_count > 0:
            print("Document replaced successfully.")
        else:
            print("No document matched the filter criteria.")
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)


 
# print(x)
if __name__ == '__main__':
    app.run(debug=True)
