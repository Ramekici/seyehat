import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificDate, deleteTarihItems , setTarihId, stateTarih } from '../../../features/veriler/tarihSlice';
import SelectedDate from '../../components/date/SelectedDate';

import Heading from '../inputUI/Heading';

export default function TarihteBugunList() {

    const tarih = useSelector(stateTarih);
    const [inter, setInter] = useState(new Date());
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getSpecificDate(inter));
    }, [inter, dispatch])

    return (
        <section className="my-3">
            <Heading text="Günlük Tarih Verileri" />
            <div className="row">
                <div className="col-4">
                    <SelectedDate
                    id="TarihteBugunListe"
                    onChangeHandler={(date) => setInter(date)} 
                    date={inter}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                {tarih.ilgiliTarihteki ? 
                    <div className="list-group">
                        {tarih.ilgiliTarihteki.map(item => {
                        return(
                        <div className="list-group-item list-group-item-action" >
                            <div style={{color:"red"}}> {item.title} : </div> 
                            {item.info}
                            <div style={{float:"right"}}>
                                <button className="btn btn-sm btn-danger mx-2"
                                onClick={()=> dispatch(setTarihId(item._id))}> Güncelle </button>
                                <button className="btn btn-sm btn-danger mx-2"
                                onClick={()=> dispatch(deleteTarihItems (item._id, inter))}> Sil </button>
                            </div>     
                        </div>
                        )
                    })} </div> : 
                    <p style={{color:"red"}}> Herhangi bir veri bulunmadı </p>
                }
                </div>
            </div>
        </section>
        
    )
}
