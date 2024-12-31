import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({ isStudentRoute = false, children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const isStudent = role === 'student';


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  
  if (isStudentRoute && !isStudent) {
    return <Navigate replace to="/access-denied" />;
  }

  
  return children ? children : <Outlet />;
};

export default Protected;
