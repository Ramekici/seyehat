import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser , stateAuth } from '../../../features/auth/authSlice';

const Login:React.FC = (props) => {

  const isAuth = useSelector(stateAuth);
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const [loginVal, setloginVal] = useState(isAuth.defaultValLog);
  const [errors, setErrors] = useState({emil :'', psswd:''});

  const { email, password } = loginVal;
  const { emil, psswd} = errors;

  useEffect(() => {
    setErrors({...isAuth.errorLogin});
  },[isAuth.errorLogin])

  useEffect(() => {
    if(isAuth.isCompleted ===true){
      setloginVal({...loginVal, ...isAuth.defaultValLog });
    }
  }, [isAuth.isCompleted, loginVal, isAuth.defaultValLog])

  const handleChange = (name:string) => (event:any) => {
    setloginVal({ ...loginVal, [name]: event.target.value}); 
  };
    
    
  const onSubmitHandler = (event:any) => {
    event.preventDefault();
    const data = {email, password}
    dispatch(loginUser(data));  
  }


  const loginData = [
    {id: "6131", title: 'Email Adresi', type: "email", value:email, name:"email", error:emil },
    {id: "6132", title: 'Parola', type: "password", value:password, name:"password", error:psswd }
  ]
    return (
        <div className="card" style={{borderBottom:"1px solid black", borderRadius:"15px 15px 0 0"}}>
          <div className="card-header" style={{backgroundColor:"#CBCBA9", padding:"1rem"}}>
                  <h2 className="mb-0">
                    <button className="btn btn-link" type="button"
                        style={{ fontSize:"1.3rem", fontWeight:"bold", border:"none"}}
                        onClick={()=> setToggle(!toggle)}>
                      <i className=
                      { toggle ? "fas fa-arrow-circle-up mr-2" : 
                      "fas fa-arrow-circle-down mr-2"}></i>Üye Girişi
                    </button>
                  </h2>
                </div>
                <div className={toggle ? "collapse show" : "collapse"}>
                  <div className="card-body">
                    <div className="row mt-2">
                      {loginData.map(data => {
                        return (
                          <div className={"form-group col-12 mt-1"} key={data.id} >
                          <label htmlFor= {data.id}> {data.title} </label>
                          <input 
                              id={data.id}
                              type={data.type ? data.type : "text"} 
                              className="form-control" 
                              placeholder = {data.title}
                              value = {data.value}
                              onChange = {handleChange(`${data.name}`)}/>
                            { data.error ? <div className="invalid-feedback" 
                            style={{display:"block"}}> {data.error} </div> : null}
                        </div>
                      )})}
                      <div className="col-12 mt-2"> 
                        <button className="btn btn-block" style={{backgroundColor:"#c38e0e", 
                        fontSize:"1rem", color:"white"}} 
                          onClick= {onSubmitHandler}> Giriş Yap </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}
export default Login;