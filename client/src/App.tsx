import LandingPage from "./components/LandingPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HabitSelection from "./components/HabitSelection";
import DashBoard from "./components/DashBoard";
const App = () => {
  return (
    <div>
      <BrowserRouter 
       future={{
        v7_relativeSplatPath: true,
      }}>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/habitselection" element={<HabitSelection/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
