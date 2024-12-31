import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/Dashboard/dashboard';
import EnrolledCourse from './components/course/EnrolledCourse';
import CourseClassesPage from './components/course/CourseClassesPage';
import Paymentstatus from './components/payment/PaymentStatus'; 
import PaymentDetails from './components/payment/PaymentDetails';
import Protected from './components/layout/Protected'; 
import Home from './components/home/Home';
import  Login from "./components/auth/Login";
import AccessDenied from './AccessDenied';
import { Error } from './components/Error/Error';
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); 

  
  const isDashboard = location.pathname === '/student/dashboard';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-grow overflow-y-auto lg:ml-64 ${
            isDashboard ? 'mt-[96px]' : 'mt-[58px]'
          }`}
        >
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="/access-denied" element={<AccessDenied/>}/>

            {/* Protecting Dashboard route */}
            <Route path="/student/dashboard" element={<Protected isStudentRoute={true}><Dashboard /></Protected>} />
            
           
            {/* Protecting Enrolled Course route */}
            <Route path="/enrolled-course" element={<Protected isStudentRoute={true}><EnrolledCourse /></Protected>} />
            
            {/* Protecting Course Classes Page route */}
            <Route
              path="/verified-student/dashboard/course/class/:courseId"
              element={<Protected isStudentRoute={true}><CourseClassesPage /></Protected>}
            />
            
            {/* Protecting Payment Status route */}
            <Route
              path="/payment-status"
              element={<Protected isStudentRoute={true}><Paymentstatus /></Protected>} 
            />
            
            {/* Protecting Payment Details route */}
            <Route
              path="/payment-details/:orderId"
              element={<Protected isStudentRoute={true}><PaymentDetails /></Protected>} 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
