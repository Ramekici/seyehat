import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getVeriler, stateDatas } from '../../../features/veriler/verilerSlice';
import Spinner from '../../UI/Spinner';


const VeriData = () => {

    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [toogleEl, setToggleEl] = useState(false);

    ///// redux

    const genel = useSelector(stateDatas);
    /////

    const date = moment(genel.tarih).format("Do MMMM YYYY");
    ////// fonksiyonlar

    useEffect(() => {
        dispatch(getVeriler(genel.tarih))
    }, [dispatch, genel.tarih]);

    const [openState, setOpenState] = useState({});

    const changePos = (id: string, i: number) => {
        const elemans = Object.keys(openState);
        const elam = elemans.findIndex(item => item === id);
        if(Object.values(openState)[elam]) {
            setOpenState({...openState, [id]: false});
        } else {
            setOpenState({...openState, [id]: true});
        }
    }

    useEffect(()=>{
        const eleman = Object.values(openState);
        const ela = eleman.includes(true);
        if(ela){
            setToggleEl(true);  
        } else{
            setToggleEl(false);
        }

    }, [openState])

    const toggleHandler = () => {
        if(toogleEl||toggle){
            setToggle(false);
            setToggleEl(false);
            setOpenState({});
        } else {
            setToggle(true)
        }
        
    };

    const yayin = genel.veriler.length > 0 ? 
        genel.veriler.map((item,i) => {       
            return(
                    <div className="list-group mt-3" key = {item._id} style={{marginRight:"0"}}>
                        <div className="list-group-item list-group-item-action text-secondary" 
                            style={{backgroundColor: "#f2f2eb", paddingRight:"0"}}>
                            {item._id}
                            <span style={{float:"right"}}>
                                <button className="btn btn-sm mx-5"
                                    onClick={(() => {
                                        changePos(item._id, i)})}> 
                                    <i className= {Object.values(openState)[i] ? "fas fa-angle-up fa-2x" : "fas fa-angle-down fa-2x"}  style={{color:"red"}}></i>  
                                </button>
                            </span>
                            {item.elemans.length > 0 && Object.values(openState)[i] || toggle ?
                            <div className="list-group mt-1" style={{listStyle:"none", float:"none"}}>
                                {item.elemans.map(el => 
                                    <div className="list-item d-flex"> 
                                        <span className="text-capitalize col-6" 
                                            style={{color: "tan", marginLeft:"-0.3rem"}}> 
                                            {el.mission} 
                                        </span> 
                                        <span className="text-capitalize col-6"  
                                        style={{color: "#2968bf"}}> 
                                            : {el.name} <span className="text-uppercase">{el.surName} </span> </span> 
                                    </div>
                                )}
                            </div> : null}
                        </div>
                    </div>
            ) 
        }) : 
        <div className="mx-auto">
           <Spinner/> 
           <p className="text-center text-gray" style={{fontSize:"1.3rem"}}>Beklenmeyen bir hata ile karşılaşıldı..., Lütfen daha sonra deneyiniz...</p>
        </div>
       

        return (
            <div>
                <div className="d-flex align-items-center" style={{justifyContent:"space-between"}}>
                    <h5 className="text-gray mx-auto"> {date} Tarihli Veriler </h5>
                    <button style={{border:"none",backgroundColor:"inherit", alignItems:"flex-end"}}
                            onClick={() => toggleHandler()}> 
                            <span className="px-2">
                                {toggle || (toogleEl ? " Kapat " : "Tümünü Aç ")}
                            </span> 
                            <i className= { toggle ? "fas fa-caret-up fa-2x" :
                                            "fas fa-caret-down fa-2x"}  style={{color:"red"}}></i>
                    </button>

                </div>
                <div style={{float:"unset", padding:"0", border:"none"}}>
                  {yayin}   
                </div>
                
            </div>
        )
        ;
    
}
export default VeriData;