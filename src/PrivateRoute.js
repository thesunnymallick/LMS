import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    // Admin
    const { isAdmin } = useSelector(state => state.loginInfo.admin);
    const { isUser } = useSelector(state => state.loginInfo.user);
    
    return isAdmin || isUser ? <Outlet/> : <Navigate to={"/"}/>

     
}

export default PrivateRoute