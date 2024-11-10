import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, X, Sparkles, Calendar, Plus } from 'lucide-react';
import axios from 'axios';

interface Habit {
  id: string;
  name: string;
  category: 'habit' | 'daily';
}

const predefinedHabits: Habit[] = [
  { id: '1', name: 'Exercise for 30 minutes', category: 'habit' },
  { id: '2', name: 'Read for 20 minutes', category: 'habit' },
  { id: '3', name: 'Meditate for 10 minutes', category: 'habit' },
  { id: '4', name: 'Drink 8 glasses of water', category: 'daily' },
  { id: '5', name: 'Get 8 hours of sleep', category: 'daily' },
  { id: '6', name: 'Take vitamins', category: 'daily' },
  { id: '7', name: 'Practice gratitude', category: 'habit' },
  { id: '8', name: 'Limit social media to 1 hour', category: 'habit' },
  { id: '9', name: 'Eat 5 servings of vegetables', category: 'daily' },
  { id: '10', name: 'Write in journal', category: 'habit' },
];

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function HabitSelection() {
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const navigate = useNavigate();

  const handleHabitToggle = (habitName: string) => {
    setSelectedHabits(prev =>
      prev.includes(habitName)
        ? prev.filter(name => name !== habitName)
        : [...prev, habitName]
    );
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskDescription.trim()) {
      setSelectedHabits(prev => [...prev, taskDescription.trim()]);
      setTaskDescription('');
      setNotification({ type: 'success', message: 'Task added successfully!' });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/receivedata', {
        habits: selectedHabits,
      });
  
      console.log(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving habits:', error);
      setNotification({ type: 'error', message: 'Failed to save habits.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            Build Your Habits
          </h1>
          <p className="text-lg text-gray-600">Choose habits that will help you achieve your goals</p>
        </div>

        {notification && (
          <div 
            className={`mb-8 p-4 rounded-xl shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`} 
            role="alert"
          >
            <div className="flex justify-between items-center">
              <p className={`${
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              } font-medium`}>
                {notification.message}
              </p>
              <button 
                onClick={closeNotification} 
                className={`${
                  notification.type === 'success' ? 'text-green-600' : 'text-red-600'
                } hover:opacity-75 transition-opacity`}
                aria-label="Close notification"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Habits</h2>
            </div>
            <div className="space-y-4">
              {predefinedHabits.filter(habit => habit.category === 'habit').map(habit => (
                <div 
                  key={habit.id} 
                  className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Checkbox
                    id={habit.id}
                    checked={selectedHabits.includes(habit.name)}
                    onCheckedChange={() => handleHabitToggle(habit.name)}
                    className="h-5 w-5 border-2 border-purple-200 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label htmlFor={habit.id} className="ml-3 text-gray-700 font-medium cursor-pointer select-none">
                    {habit.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Daily Tasks</h2>
            </div>
            <div className="space-y-4">
              {predefinedHabits.filter(habit => habit.category === 'daily').map(habit => (
                <div 
                  key={habit.id} 
                  className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Checkbox
                    id={habit.id}
                    checked={selectedHabits.includes(habit.name)}
                    onCheckedChange={() => handleHabitToggle(habit.name)}
                    className="h-5 w-5 border-2 border-purple-200 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label htmlFor={habit.id} className="ml-3 text-gray-700 font-medium cursor-pointer select-none">
                    {habit.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">Add Custom Task</h2>
          </div>
          <form onSubmit={handleSaveTask} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your custom task..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 rounded-lg font-medium transition-colors"
            >
              Add Task
            </Button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="px-12 py-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Selected Habits'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}