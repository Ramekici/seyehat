import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createUser, stateAuth } from '../../../features/auth/authSlice';


export default function Register() {
    const isAuth = useSelector(stateAuth);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const [registerVal, setRegisterVal] = useState(isAuth.defaultValReg);
    const [errors, setErrors] = useState({nme:'', lstName:'', emil :'', psswd:'', rePsswd:''});
    const {name, lastName, email, password, rePassword} = registerVal;
    const {nme, lstName, emil, psswd, rePsswd} = errors;

    useEffect(() => {
      setErrors({...isAuth.errorRegister});
    },[isAuth.errorRegister])

    useEffect(() => {
      if(isAuth.isCompleted ===true){
        setRegisterVal({...registerVal, ...isAuth.defaultValReg});
      }
    }, [isAuth.isCompleted, registerVal, isAuth.defaultValReg])

    const handleChange = (name:any) => (event:any) => {
      setRegisterVal({ ...registerVal, [name]: event.target.value}); 
    };

    const onSubmitHandler = (event:any) => {
      event.preventDefault();
      if(password === rePassword) {
        dispatch(createUser(registerVal));
      } else return alert("parolalar uyumsuz");
    }
    
    const registerData = [
        {id: "6121", title: 'Ad', type: "text", value:name ,
         name:'name', col:'col-6 mt-1', error:nme},
        {id: "6122", title: 'Soyad', type: "text", value:lastName,
         name:'lastName', col:'col-6 mt-1', error:lstName},
        {id: "6123", title: 'Email adres', type: "email", value:email,
         name:'email', col:'col-12 mt-1', error:emil},
        {id: "6124", title: 'Parola', type: "password", value:password, name:'password', 
        col:'col-6 mt-1', error:psswd},
        {id: "6125", title: 'Parola Tekrarı', type: "password", value:rePassword, 
        name:'rePassword', col:'col-6 mt-1', error:rePsswd},
    ]

    return (
        <div className="card mb-5" style={{borderRadius:"0 0 15px 15px"}}>
            <div className="card-header" id="headingTwo" 
            style={{backgroundColor:"#CBCBA9", padding:"1rem"}}>
                <h2 className="mb-0" >
                    <button className="btn btn-link" type="button" 
                      style={{ fontSize:"1.3rem", fontWeight:"bold", border:"none"}} 
                      onClick={()=> setToggle(!toggle)}>
                      <i className=
                      {toggle ? "fas fa-arrow-circle-up mr-2" : 
                      "fas fa-arrow-circle-down mr-2"}></i> Hesap Oluştur
                    </button>
                </h2>
            </div>
            <div className={toggle ? "collapse show" : "collapse"}>
                  <div className="card-body">
                    <div className="row mt-2">
                        {registerData.map(data => {
                            return (
                              <div className={"form-group " + data.col} key={data.id} >
                                <label htmlFor= {data.id}> {data.title} </label>
                                <input 
                                    id={data.id}
                                    type={data.type ? data.type : "text"} 
                                    className="form-control" 
                                    placeholder= {data.title}
                                    value={data.value}
                                    onChange={handleChange(`${data.name}`)}/>
                                  { data.error ? <div className="invalid-feedback" 
                                    style={{display:"block"}}> {data.error} </div> : null}
                                  {data.name === 'password' ? 
                                  <small id="passwordHelpInline" className="text-muted">
                                    <sup>*</sup>8-20 karakter uzunluğunda girilmelidir.
                                  </small> : null}
                              </div>
                            )
                        })}
                      <div className="col-12 mt-2">
                        <button className="btn btn-block" 
                          style={{backgroundColor:"#c38e0e", fontSize:"1rem", color:"white"}} 
                          onClick={onSubmitHandler} 
                          type="submit"> Üye Ol </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}
