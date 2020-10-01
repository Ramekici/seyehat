import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnaKategorilerToDatabase, stateEl, 
    updateKategoriler, stateId, 
    stateCompleted } from '../../../features/veriler/kategorilerSlice';


import InputText from '../inputUI/InputText';
import Kategoriler from './Kategoriler';
import AltKategoriler from './AltKategoriler';
import Heading from '../inputUI/Heading';
import Button from '../inputUI/Button';


export default function KategoriGir() {

    const dispatch = useDispatch();
    const completed = useSelector(stateCompleted);
    const elemanId = useSelector(stateId);
    const eleman =  useSelector(stateEl);

    const [veri, setVeri] = useState({category:'', link:''})

    const {category, link} = veri;

    const onHandleVeri = (name:string) => (event:any) => {
        setVeri({...veri, [name]: event.target.value})
    }

    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        let payload = { _id:'', user:'', category, link, openPos: false, missions:[]}
        if(elemanId !== ''){
            payload ={ _id:eleman._id, user:eleman.user, category, link, openPos: false, missions:[]}
            dispatch(updateKategoriler(elemanId, payload))
        } else {
           dispatch(setAnaKategorilerToDatabase( payload)); 
        }   
    }

    useEffect(() => {
        if(eleman) {
           setVeri({ category : eleman.category, link : eleman.link}) 
        } else if(completed) {
            setVeri({ category:'', link:''})
        }
    }, [eleman, completed])

    return (
        <div className="container" style={{marginLeft:"-10px", marginRight:"-10px"}}>
            <section className="pb-2" style={{borderBottom:"2px solid darkgray"}}> 
                <Heading text="Yeni Kategori Girişi/Güncelleme"/>
                <form onSubmit={onSubmitHandler}>
                        <div className="row">
                            <InputText
                                col="col"
                                id="category"
                                onChangeHandler={onHandleVeri("category")} 
                                val={category} 
                                label="Kategori"
                                type="text"
                                />
                            <InputText
                                col="col"
                                id="link"
                                onChangeHandler={onHandleVeri("link")} 
                                val={link} 
                                label="Link"
                                type="text"/>
                        </div>
                        <Button text={elemanId !== '' ? 'Güncelle' : 'Kaydet'} />
                </form>
            </section>
            <Kategoriler/>
            <AltKategoriler/>
        </div>
       
        
    )
}

                          

