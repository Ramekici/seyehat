import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKategoriler, stateKategoriler, 
    setId, setAltId, deleteAltKategorilerFromDatabase, 
    deleteKategorilerFromDatabase } from '../../../features/veriler/kategorilerSlice';

import { setModalOpen } from '../../../features/modal/modalSlice';
import Heading from '../inputUI/Heading';


export default function Kategoriler() {
    const dispatch = useDispatch();
    const kategoriDatas = useSelector(stateKategoriler);

    useEffect(() => {
        dispatch(getKategoriler());
    }, [dispatch]);

    

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


    const setEl = (id:string, altId:string) => {
        const payload = {id, altId};
        return setAltId(payload);
    } 


    let kategoriler = kategoriDatas.length > 0 ? kategoriDatas.map((item, i) => {
        return(
            <div className="list-group" key={item._id} 
                style={Object.values(openState)[i] ? {border:"2px solid orange"} : {}}>
                <div className="list-group-item list-group-item-action" >
                    {(item.missions ? item.missions.length > 0: false) ? 
                    <button className="btn btn-info m-2 p-2" 
                        onClick={()=> {changePos(item._id, i)}}>
                        <i className={Object.values(openState)[i] ? 
                            "fas fa-arrow-circle-up" : 
                            "fas fa-arrow-circle-down"}></i>
                    </button> : null}
                    {item.category} 
                    { (item.missions ? item.missions.length <= 0 :null)|| Object.values(openState)[i]? 
                        <button className="btn btn-sm m-2 p-2"
                                onClick={() => {
                                    dispatch(setId(item._id))
                                    dispatch(setModalOpen())
                                    }}> 
                        Yeni Alt Başlık Ekle </button> : 
                    null}
                    {!Object.values(openState)[i]? 
                    <div style={{float:"right"}} > 
                        <button className="btn btn-sm btn-success m-1 p-3" 
                            onClick={() => dispatch(setId(item._id))}> 
                            <i className="far fa-edit"></i> Güncelle </button>
                        <button className="btn btn-sm btn-danger m-1 p-3"
                            onClick={() => dispatch(deleteKategorilerFromDatabase(item._id))}> 
                            <i className="far fa-trash-alt"></i> Sil </button>
                    </div>
                    :null}
                    {Object.values(openState)[i] ?
                    <div className="list-group">
                        {item.missions ? item.missions.map((i, ind) => {
                         return ( <div className="list-group-item" 
                                        style={{display:"flex", justifyContent:"space-between"}}> 
                                    <div>
                                       {i} 
                                    </div>
                                    <div style={{justifyContent:"space-around"}}>
                                        <button className="btn btn-sm btn-danger" 
                                            onClick={() => dispatch(deleteAltKategorilerFromDatabase(item._id, i))}> 
                                            <i className="far fa-trash-alt"></i> Sil </button>
                                        <button className="btn btn-sm btn-info"
                                        data-toggle="modal" 
                                        data-target="#altBaslık"
                                        onClick={() => {
                                            dispatch(setEl(item._id, i))
                                            dispatch(setModalOpen())
                                            }}>
                                        <i className="far fa-edit"></i> Güncelle </button>
                                    </div>  
                         </div>)}): null
                        }
                    </div>: null}
                    
                </div>
          </div>
        )
    }) : null;
    return  (<div className="mt-3">
                <Heading text="Kategori Listeleme" />
                {kategoriler}
            </div>);

}