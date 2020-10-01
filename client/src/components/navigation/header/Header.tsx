import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import {stateAuth, logoutUser} from '../../../features/auth/authSlice';

import Logo from './Logo';

export default function Header() {

    const isAuth = useSelector(stateAuth);
    const dispatch = useDispatch();

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" 
            style={{backgroundColor:"#E5E5E5"}} >
            <NavLink className="navbar-brand" to="/" >
                <Logo/>
            </NavLink>
            <button className="navbar-toggler" type="button" 
                style={{zIndex:1020}}
                data-toggle="collapse" data-target="#anasayfa" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" 
                id="anasayfa" 
                style={{zIndex:1005}}>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink 
                            exact
                            className="nav-link" 
                            to="/" 
                            style={{fontSize:"1.2rem"}}
                            activeClassName="selected"
                            activeStyle={{fontWeight:"bold"}}> Anasayfa 
                        <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item dropdown" >
                        <NavLink className="nav-link dropdown-toggle" to="/kategoriler"
                            activeClassName="selected"
                            activeStyle={{fontWeight:"bold"}}
                            style={{fontSize:"1.2rem"}}
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                        Kategoriler
                        </NavLink>
                        <div className="dropdown-menu" 
                            aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" 
                            to="/cumhurbaskanlık">Cumhurbaşkanlığı</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" 
                            to="/hakkımızda"
                            activeClassName="selected"
                            activeStyle={{fontWeight:"bold"}}
                            style={{fontSize:"1.2rem"}}> Hakkımızda </NavLink>
                    </li>
                    {isAuth.isAuthenticated ? 
                    <li className="nav-item">
                        <NavLink className="nav-link" 
                            to="/admin" 
                            style={{fontSize:"1.2rem"}}> Admin </NavLink>
                    </li> : null}
                    <li className="nav-item">
                        {isAuth.isAuthenticated ? 
                        <NavLink className="nav-link" 
                            type='button' to="/" 
                            style={{fontSize:"1.2rem"}}
                            activeClassName="selected"
                            activeStyle={{fontWeight:"bold"}}
                            onClick={()=> dispatch(logoutUser())}> Çıkış </NavLink>:
                        <NavLink className="nav-link" 
                            to="/authenticate" 
                            style={{fontSize:"1.2rem"}}
                            activeClassName="selected"
                            activeStyle={{fontWeight:"bold"}}> Giriş </NavLink>
                        }
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" 
                    placeholder="Ara" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" 
                    type="submit">Ara</button>
                </form>
            </div>
        </nav>
    )
}

                                   