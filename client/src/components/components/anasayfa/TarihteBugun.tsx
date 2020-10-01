import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTarihteBugun, stateTarihte} from '../../../features/veriler/tarihSlice';


export default function TarihteBugun() {
    const tarihten = useSelector(stateTarihte);
    const date = new Date();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getTarihteBugun())
    }, [dispatch])
    
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", 
    "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    return (
        
        <div className="card" style={{backgroundColor:"tan", borderRadius:"0.3rem"}}>
            <div className="card-body">
            <h4 className="display-5 text-center" style={{color:"#000066"}}> 
                Takvim Yaprağı : {date.getDate()} {months[date.getMonth()]} </h4>
                <ul className="list-group list-group-flush" >
                    {tarihten ? tarihten.map(item => {
                        return (
                        <li className="list-group-item" key={item._id} 
                        style={{backgroundColor:"inherit", }}>
                            <p style={{fontSize:"0.8rem", color:"black", padding:"0px", margin:"-0.1rem"}}> 
                             <sup> * </sup>
                            {item.info} ({item.year}) </p>  
                        </li>
                        )
                    }): null}
                </ul>
            </div>
        </div>
    )
}
