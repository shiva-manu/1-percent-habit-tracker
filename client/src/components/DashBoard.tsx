import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckSquare, Flame, Plus } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import HabitsRadarChart from "./charts/RadarChartDemo";
import './DashBoard.css'
interface Task {
  habit_name: string;
  reason: string;
  suggested_improvement: string;
}

interface Data {
  tasks_being_done_well: Task[];
  tasks_to_improve: Task[];
}
export default function DashBoard() {
  const [habits, setHabits] = useState<any[]>([]);
  const [reschedule,setReschedule]=useState<string>('')
  const [data, setData] = useState<Data | null>(null);
  const [loading,setLoading]=useState<boolean>(false);

  const tasks = [
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-cyan-400" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    { color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-cyan-400" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    { color: "bg-yellow-300" },
    {  color: "bg-blue-200"},
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    {  color: "bg-cyan-400" },
    {  color: "bg-yellow-300" },
    {  color: "bg-blue-200" },
    { color: "bg-yellow-300" },
    {  color: "bg-blue-200"},
  ];
  const handleSubmit=async()=>{
    try{
      await axios.post("http://127.0.0.1:5000/api/prompt/",{
        prompt:reschedule
      })
      axios.get('http://127.0.0.1:5000/api/get_habits')
      .then(response => {
        console.log(response.data);
        setHabits(response.data);  // Store response data in habits
      })
    }catch(error){
      console.log("Error",error);
    }finally{
    }
  }
  useEffect(()=>{
    
    //   axios.get('http://127.0.0.1:5000/api/get_habits')
    // .then(response => {
    //   console.log(response.data);
    //   setHabits(response.data);  // Store response data in habits
    // })
    
    // axios.get("http://127.0.0.1:5000/api/habits/attention")
    // .then(response=>{
    //   setData(response.data)
    // })
    setLoading(true);
    const fetchData=async()=>{
        const [habitsResponse, attentionResponse] = await axios.all([
          axios.get('http://127.0.0.1:5000/api/get_habits'),
          axios.get('http://127.0.0.1:5000/api/habits/attention')
        ]);
    
      setHabits(habitsResponse.data);
      setData(attentionResponse.data);
      setLoading(false);
    }
    fetchData();
},[]);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">1%</div>
        <div className="flex-1 flex gap-2">
          <Input onChange={(e)=>{setReschedule(e.target.value)}} className="flex-1" placeholder="Enter here..." />
          <Button onClick={()=>{handleSubmit();}} variant="default" className="bg-black hover:bg-gray-800 text-white">
            RESCHEDULE
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="h-6 w-6 text-red-500" />
          <span className="text-xl">12</span>
        </div>
      </div>

      {/* Do Now Section */}
      <div className="flex items-center gap-4">
        <h2 className="font-bold">DO NOW :</h2>
        <span>complete math assignment</span>
        <div className="flex items-center gap-2 ml-auto">
          <CheckSquare className="h-5 w-5" />
          <Button className="bg-yellow-400 hover:bg-yellow-500">
            remarks
          </Button>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Tasks Section */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              {/* <h2 className="font-bold mb-4">TASKS NEED ATTENTION</h2>
              {loadiing?()
              <span className="loading loading-spinner loading-sm"></span>):
              (data?.tasks_to_improve.slice(0,2).map((task, i) => (
                <div key={i} className="bg-yellow-50 p-4 rounded-lg mb-2">
                  <h3 className="font-semibold">{task.habit_name}</h3>
                  <p className="text-sm text-gray-600">
                    {task.reason}
                  </p>
                </div>
              ))
               */}
                <h2>Tasks Being Done Well</h2>
                {loading ? (
                <div className="lds-ripple"><div></div><div></div></div>
                ) : (
                  data?.tasks_being_done_well.slice(0, 2).map((task, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg mb-2">
                    <h3 className="font-semibold">{task.habit_name}</h3>
                    <p className="text-sm text-gray-600">
                      {task.reason}
                    </p>
                  </div>
        ))
      )}
            </div>
            <div>
              <h2 className="font-bold mb-4">TASKS DOING WELL</h2>
              {loading ? (
                <div className="lds-ripple"><div></div><div></div></div>
                ) : (
                  data?.tasks_being_done_well.slice(0, 2).map((task, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg mb-2">
                    <h3 className="font-semibold">{task.habit_name}</h3>
                    <p className="text-sm text-gray-600">
                      {task.reason}
                    </p>
                  </div>
        ))
      )}
            </div>
          </div>
        </Card>

        {/* 1% A Day */}
        <Card className="p-6 flex flex-col items-center">
  <h2 className="font-bold mb-4 text-center">1% A DAY</h2>
  <div className="text-center text-gray-500 mb-6">Showing habits completion and streak rates for November 2024</div>
  <div className="w-full flex items-center justify-center">
    <HabitsRadarChart/>
  </div>
  <div className="text-center mt-4 text-sm text-gray-600">
    <p> Overall habits consistency improved by 5.2% this month</p>
    <p className="text-xs mt-2">Last 30 days performance analysis</p>
  </div>
</Card>


        {/* To-Do List */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">TO-DO LIST</h2>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {/* {habits.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-12 text-sm">{item.time}</span>
                <div className={`flex-1 p-2 rounded ${tasks[index].color} || 'bg-gray-200'`}>
                  {item.name}
                </div>
              </div>
            ))} */}
            {loading ? (
        <div className="lds-ripple"><div></div><div></div></div>
      ) : (
        habits.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-12 text-sm">{item.time}</span>
            <div className={`flex-1 p-2 rounded ${tasks[index].color || 'bg-gray-200'}`}>
              {item.name}
            </div>
          </div>
        ))
      )}
          </div>
        </Card>
      </div>
    </div>
  );
}
