import React, { useState } from 'react';

import InputText from '../inputUI/InputText';
import SelectedDate from '../../components/date/SelectedDate';
import DigerList from './DigerList';
import Heading from '../inputUI/Heading';
import Button from '../inputUI/Button';

export default function Diger() {
    
    //const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());
    const [veri, setVeri] = useState({dolar:'', euro:'', altin:'' })
    const {dolar, euro, altin} = veri;
    
    const onHandleVeri = (name:string) => (event:any) => {
        setVeri({...veri, [name]: event.target.value})
    }

    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        const payload = { dolar, altin, euro, date: startDate };
        console.log(payload)
    }


    return (
        <div className="container" style={{marginLeft:"-10px", marginRight:"-10px"}}>
            <section className="pb-2" style={{borderBottom:"2px solid darkgray"}}> 
            <Heading text ="Diğer Bilgiler Veri Girişi/Güncelleme" />
            <form onSubmit={onSubmitHandler}>
                <div className="row mt-3 align-items-center">
                    <div className="col-12 col-lg-6 my-2">
                        <div>
                           <label htmlFor="diger"> Tarih </label> 
                        </div>
                        <SelectedDate
                            onChangeHandler={(date) => setStartDate(date)} 
                            date={startDate} 
                            id="diger"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-6 px-0">
                        <InputText 
                            col="col"
                            id="dolar"
                            onChangeHandler={onHandleVeri("dolar")} 
                            val={dolar} 
                            label="Dolar"
                            type="text"/>
                    </div>
                    <div className="col-12 col-lg-6 px-0">
                        <InputText 
                            col="col"
                            id="euro"
                            onChangeHandler={onHandleVeri("euro")} 
                            val={euro} 
                            label="Euro"
                            type="text"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-6 px-0 px-0">
                        <InputText 
                            col="col"
                            id="euro"
                            onChangeHandler={onHandleVeri("altin")} 
                            val={altin} 
                            label="Altın"
                            type="text"/>   
                    </div>
                </div>
                <Button text="Kaydet" /> 
            </form>
            </section>
            <DigerList/>
        </div>
    )
}
