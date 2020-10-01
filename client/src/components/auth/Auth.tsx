import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stateAuth } from '../../features/auth/authSlice';


import Login from './login/Login';
import Register from './register/Register';

const Auth: React.FC = (props: any) => {

    const isAuth = useSelector(stateAuth);
    useEffect(() => {
        if(isAuth.isAuthenticated) {
          return props.history.push('/');
        }
    }, [props.history, isAuth.isAuthenticated])
    return (
        <div className="py-5 mx-auto" 
        style={{backgroundImage: `url(${"https://cdn.pixabay.com/photo/2015/11/19/21/11/knowledge-1052013_1280.jpg"})`, 
            backgroundSize:"cover"}}>  
            <div className="row justify-content-center align-items-center vh-md-90 mx-0" 
                style={{zIndex:1000}}>
                <div className="col-md-10 col-lg-6">
                    <div className="accordion accordion-portal" id="accordionExample">
                        <Login/>
                        <Register/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;