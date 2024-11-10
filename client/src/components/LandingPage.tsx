import { useState } from 'react' 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, BarChart2, Calendar, Menu, X } from 'lucide-react'
import HabitSelection from './HabitSelection'
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const redirectToHabitSelection = () => {
    <HabitSelection/>
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-700">HabitTrack</div>
          <div className="hidden md:flex space-x-6">
            <Link to="#features" className="text-gray-600 hover:text-purple-700">Features</Link>
            <Link to="#how-it-works" className="text-gray-600 hover:text-purple-700">How It Works</Link>
            <Link to="#pricing" className="text-gray-600 hover:text-purple-700">Pricing</Link>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2">Log In</Button>
            <Button>Sign Up</Button>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="#features" className="block text-gray-600 hover:text-purple-700">Features</Link>
            <Link to="#how-it-works" className="block text-gray-600 hover:text-purple-700">How It Works</Link>
            <Link to="#pricing" className="block text-gray-600 hover:text-purple-700">Pricing</Link>
            <Button variant="outline" className="w-full mb-2">Log In</Button>
            <Button className="w-full">Sign Up</Button>
          </div>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Track Your Habits, Transform Your Life</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">HabitTrack helps you build positive habits, break bad ones, and achieve your goals with powerful tracking and insights.</p>
          <Button onClick={()=>{navigate("/habitselection")}} size="lg" className="text-lg px-8 py-4">Start Tracking for Free</Button>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features That Empower You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-12 h-12 text-purple-600" />}
                title="Easy Habit Tracking"
                description="Log your habits with just a tap, making consistency effortless."
              />
              <FeatureCard
                icon={<BarChart2 className="w-12 h-12 text-purple-600" />}
                title="Insightful Analytics"
                description="Visualize your progress and identify patterns to improve."
              />
              <FeatureCard
                icon={<Calendar className="w-12 h-12 text-purple-600" />}
                title="Customizable Schedules"
                description="Set personalized reminders and track habits on your terms."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              <Step number={1} title="Create Habits" description="Define the habits you want to track or break." />
              <Step number={2} title="Daily Check-ins" description="Log your progress each day with easy taps." />
              <Step number={3} title="Review & Improve" description="Analyze your data and adjust your strategies." />
            </div>
          </div>
        </section>

        <section className="bg-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Habits?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have already changed their lives with HabitTrack. Start your journey today!</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input type="email" placeholder="Enter your email" className="max-w-xs" />
              <button onClick={()=>redirectToHabitSelection()}>Get Started</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HabitTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-purple-50 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex flex-col items-center max-w-xs">
      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}
