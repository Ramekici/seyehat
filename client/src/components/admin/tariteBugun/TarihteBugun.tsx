import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setTarihItems, updateTarihItems, stateTarih} from '../../../features/veriler/tarihSlice';


import InputText from '../inputUI/InputText';
import SelectedDate from '../../components/date/SelectedDate';
import TarihteBugunList from './TarihteBugunList';
import Heading from '../inputUI/Heading';
import Button from '../inputUI/Button';


const TarihteBugun: React.FC = () => {
    const dispatch = useDispatch();
    
    const [startDate, setStartDate] = useState(new Date());
    const [veri, setVeri] = useState({title:'', info:''})
    const {title, info} = veri;


    ///// redux
    const tarih = useSelector(stateTarih);

    ///// error part
    const [errors, setErrors] = useState({titl:'', inf:''});
    const {titl, inf} = errors;

    useEffect(() => {
        setErrors({...tarih.errors});
    },[tarih.errors])


    ///// fonksiyonlar

    const onHandleVeri = (name:string)=> (event:any) => {
        setVeri({...veri, [name]: event.target.value})
    }

    useEffect(() => {
        if (tarih.tarihItem._id !== '') {
            setVeri({title: tarih.tarihItem.title, info: tarih.tarihItem.info});
            setStartDate(new Date(`${tarih.tarihItem.month}/${tarih.tarihItem.day}/${tarih.tarihItem.year}`))
        } 
    }, [tarih.tarihItem._id])

    useEffect(()=>{
        if (tarih.completed) {
            setVeri({title: "", info: ""});
        }
    },[tarih.completed]);


    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        let payload = {_id:'',user:'', title, info, date: startDate}
        if(tarih.tarihItem._id !== '') {
            payload = {_id:tarih.tarihItem._id, user:tarih.tarihItem.user, title, info, date: startDate}
            dispatch(updateTarihItems(tarih.tarihItem._id, payload, startDate));
        } else {
            dispatch(setTarihItems(payload));  
        }   
    }


    return (
        <div className="container" style={{marginLeft:"-10px", marginRight:"-10px"}}>
            <section className="pb-2" style={{borderBottom:"2px solid darkgray"}}> 
            <Heading text="Yeni Tarih Verisi Girişi/Güncelleme"/>
            <form onSubmit={onSubmitHandler}>
                <div className="row mt-3">
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
                    <div className="col-12 col-lg-6 my-2">
                        <div>
                           <label htmlFor="selectedDa"> Tarih </label> 
                        </div>
                        <SelectedDate
                            onChangeHandler={(date) => setStartDate(date)} 
                            date={startDate} 
                            id="tarihteBugun"
                            />
                    </div>
                </div>   
                <div className="row mt-3">
                    <div className="col-12 px-0">
                        <InputText 
                            metin={true}
                            col="col"
                            id="metin"
                            onChangeHandler={onHandleVeri("info")} 
                            val={info} 
                            label="Açıklama"
                            type="textarea"
                            error={inf}
                        />
                    </div>
                </div> 
                <Button text ={tarih.tarihItem._id !== '' ? "Güncelle" : "Kaydet" } />
            </form>
            </section>
            <TarihteBugunList/>
        </div>
        
       
        
    )
}

export default TarihteBugun;