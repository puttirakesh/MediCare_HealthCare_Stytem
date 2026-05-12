import React from 'react'
import Hero from './pages/Hero';
import Home from './pages/Home';
import { useUser } from '@clerk/clerk-react';
import { Routes, Route, Link } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Appointments from './pages/Appointments';
import ServiceDashboard from './pages/ServiceDashboard';
import Addservices from './pages/Addservices';
import ListService from './pages/ListService';
import ServiceAppointments from './pages/ServiceAppointments';

function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return (
    <div className="min-h-screen font-mono flex items-center justify-center 
                    bg-linear-to-b from-emerald-50 via-green-50 to-emerald-50 px-4">
      <div className="text-center">
        <p className='text-emerald-800 font-semibold text-lg sm:text-2xl mb-4 amimate-fade-in'>
          Please sign in to access this page.
        </p>

        <div className="flex justify-center">
          <Link to='/' className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white 
              shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all duration-300
             ease-in-out animate-bounce-subtle"> HOME</Link>
        </div>
      </div>
    </div>
  );
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/h' element={<RequireAuth><Home /></RequireAuth>} />
      <Route path='/add' element={<RequireAuth><Add /></RequireAuth>} />
      <Route path='/list' element={<RequireAuth><List /></RequireAuth>} />
      <Route path='/appointments' element={<RequireAuth><Appointments /></RequireAuth>} />
      <Route path='/service-dashboard' element={<RequireAuth><ServiceDashboard/></RequireAuth>} /> 
      <Route path='/add-service' element={<RequireAuth><Addservices/></RequireAuth>} />
      <Route path='/list-service' element={<RequireAuth><ListService /></RequireAuth>} />
      <Route path='/service-appointments' element={<RequireAuth><ServiceAppointments /></RequireAuth>} />
    </Routes>
  )
};

export default App;