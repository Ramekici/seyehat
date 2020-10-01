import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputText from '../inputUI/InputText';
import SelectedDate from '../../components/date/SelectedDate';
import {setGazetelerToDatabase, stateErrors, stateCompleted,
    stateUpdateEl , updateGazeteler} from '../../../features/veriler/gazetelerSlice'
import GazeteMansetList from './GazeteMansetList';
import Heading from '../inputUI/Heading';
import Button from '../inputUI/Button'

export default function GazeteVerileri() {
    
    const dispatch = useDispatch();
    const errorsFromDatabase = useSelector(stateErrors);
    const updateEL = useSelector(stateUpdateEl);
    const completed = useSelector(stateCompleted);
    const [startDate, setStartDate] = useState(new Date());
    const [veri, setVeri] = useState({title:'', description:'', owner:'', name:''})
    const {title, description, owner, name} = veri;
    
    const onHandleVeri = (name:string) => (event:any) => {
        setVeri({...veri, [name]: event.target.value})
    }

    useEffect(() => {
        if (updateEL) {
           setVeri({title: updateEL.title, description: updateEL.description, 
            owner: updateEL.owner, name:updateEL.name});
           setStartDate(new Date(updateEL.date))
        } else if (completed) {
            setVeri({title: '', description: '', owner:'', name:''});
        }
        
    }, [updateEL, completed])

    const [errors, setErrors] = useState({nam:'', titl:'', desc :'', dat:''});
    const {nam, titl, desc} = errors;

    useEffect(() => {
      setErrors({...errorsFromDatabase});
    },[errorsFromDatabase])


    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        let payload = {
            _id:'', user:'', title, description, owner, name, date: startDate
        }
        if(updateEL){
            payload ={ _id:updateEL._id, user:updateEL.user, title, description, owner, name, date: startDate}
            dispatch(updateGazeteler(updateEL._id, payload, startDate))
        } else {
            dispatch(setGazetelerToDatabase(payload, startDate));
        }
    }


    return (
        <div className="container" style={{marginLeft:"-10px", marginRight:"-10px"}}>
            <section className="pb-2" style={{borderBottom:"2px solid darkgray"}}> 
            <Heading text="Yeni Gazete Manşeti Girişi/Güncelleme"/>
            <form onSubmit={onSubmitHandler}>
                <div className="row mt-3">
                    <div className="col-12 col-lg-6 px-0">
                    <InputText 
                            col="col"
                            id="name"
                            onChangeHandler={onHandleVeri("name")} 
                            val={name} 
                            label="Gazete Adı"
                            type="text"
                            error={nam}/>
                    </div>
                    <div className="col-12 col-lg-6 my-2">
                        <div>
                           <label htmlFor="selectedDatem"> Tarih </label> 
                        </div>
                        <SelectedDate
                            onChangeHandler={(date) => setStartDate(date)} 
                            date={startDate} 
                            id="selectedDatem"/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <div className="col-12 col-lg-6 px-0">
                    <InputText 
                            col="col"
                            id="baslik"
                            onChangeHandler={onHandleVeri("title")} 
                            val={title} 
                            label="Başlık"
                            type="text"
                            error={titl}/>
                    </div>
                    <div className="col-12 col-lg-6 px-0">
                        <InputText 
                            col="col"
                            id="owner"
                            onChangeHandler={onHandleVeri("owner")} 
                            val={owner} 
                            label="Sahibi"
                            type="text"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 px-0">
                        <InputText 
                            metin={true}
                            col="col"
                            id="description"
                            onChangeHandler={onHandleVeri("description")} 
                            val={description} 
                            label="Manşet"
                            type="textarea"
                            error={desc}
                            />
                    </div>
                </div>
                <Button text={updateEL ? "Güncelle" : "Kaydet" } />
            </form>
            </section>
            <GazeteMansetList/>
        </div>
    )
}
