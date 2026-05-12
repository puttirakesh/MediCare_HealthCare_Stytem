import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { Routes, Route, useLocation } from 'react-router-dom'
import Doctors from './pages/Doctors'
import DoctorDetail from './pages/DoctorDetail'
import Service from './pages/Service'
import ServiceDetail from './pages/ServiceDetail'
import Contact from './pages/Contact'
import Login from './pages/Login'
import DHome from './pages/DHome'
import DoctorAppointments from './Doctor/DoctorAppointments'
import EditProfile from './Doctor/EditProfile'
import Appointments from './pages/Appointments'
import { CircleChevronUp } from 'lucide-react'
import VerifyPaymentPage from '../VerifyPaymentPage'
import VerifyServicePayment from '../VerifyServicePayment'

const ScrollTop = ()=>{
    const {pathname} = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },[pathname]);
    return null;
}

// scroll button
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed right-4 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center 
      bg-emerald-600 text-white shadow-lg transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      hover:scale-110 hover:shadow-xl`}
      title="Go to top"
    >
      <CircleChevronUp size={22} />
    </button>
  );
};

function App(){

    // to lock horizontal overflow for all pages
      useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
    return(
     <>
     <ScrollTop/>
        <div className="overflow-hidden bg-white text-gray-900">
            <Routes>
                <Route path="/" element={<Home/>} />
                
                <Route path="/doctors" element={<Doctors/>} />
                <Route path="/doctors/:id" element={<DoctorDetail/>} />
                
                <Route path="/services" element={<Service/>} />
                <Route path="/services/:id" element={<ServiceDetail/>} />
                
                <Route path='/appointments' element={<Appointments/>}/>

                <Route path='/contact' element={<Contact/>} />
                <Route path="/doctor-admin/login" element={<Login/>}/>
                
                {/* Fixed: Dashboard route with doctor ID */}
                <Route path="/doctor-admin/:id" element={<DHome/>} />
                
                <Route path="/doctor-admin/:id/appointments" element={<DoctorAppointments/>} />
                
                <Route path="/doctor-admin/:id/profile/edit" element={<EditProfile/>} />
            
                {/* for payment verification */}
                <Route path='/appointment/success' element={<VerifyPaymentPage/>} />
                <Route path='/appointment/cancel' element={<VerifyPaymentPage/>} />
            
                <Route path='/service-appointment/success' element={<VerifyServicePayment/>} />
                <Route path='/service-appointment/cancel' element={<VerifyServicePayment/>} />            
            </Routes>
        </div>
        <ScrollButton/>
     </>
    )
}

export default App;