import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setVerilerToDatabase, updateVeriler, setMessage, stateDatas} 
    from '../../../features/veriler/verilerSlice';

import { getKategoriler, setMissions, stateCategory } 
    from '../../../features/veriler/kategorilerSlice';

import '../../components/date/SelectedDate.css';
import Selector from '../inputUI/Selector';
import Tarih from '../inputUI/Tarih';
import InputText from '../inputUI/InputText';
import VerilerList from './VerilerList';
import Tooltip from './Tooltip';
import Heading from '../inputUI/Heading';
import Button from '../inputUI/Button';

const VerilerCreate = () => {

    const dispatch = useDispatch();
    //// state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [veri, setVeri] = useState({name:'', surName:'', mission:'', category:''});
    const {name, surName, mission, category} = veri;
    ////// redux

    const genel = useSelector(stateDatas);
    const kategoriler = useSelector(stateCategory);
   
    ////input fonksiyon
    const onHandleVeri = (name:string) => (event:any) => {
        setVeri({...veri, [name]: event.target.value})
    }

    ///// Kategori Part
    useEffect(() => {
        dispatch(getKategoriler());
    }, [dispatch]);

    let kategorilerim:Array<string> = [];
    kategoriler.kategoriler.map(item => kategorilerim.push(item.category));

    useEffect(() => {
        dispatch(setMissions(category))  
    }, [category, dispatch])

    /////// Error Part

    const [errors, setErrors] = useState({nam:'', surNam:'', categor:'', missio:''});
    const {nam, surNam, categor, missio} = errors;

    useEffect(() => {
        setErrors({...genel.errors});
    },[genel.errors])

    ///// update part


    useEffect(() => {
        if (genel.updateEl._id !== '') {
            setVeri({name: genel.updateEl.name, surName: genel.updateEl.surName, 
                category: genel.updateEl.category, mission: genel.updateEl.mission});
            setStartDate(new Date(genel.updateEl.start));
            setEndDate(new Date(genel.updateEl.end))
        }
    }, [genel.updateEl._id])

    useEffect(() => {
        if(genel.isCompleted) {
            setVeri({name: '', surName: '', category: '', mission: ''});
            setStartDate(new Date());
            setEndDate(new Date()) 
        }
        
    },[genel.isCompleted])

    
    /// submit part 

    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        let payload = { _id: '', user: '', category, mission, name, surName, 
            start: startDate.toISOString().split('T')[0], 
            end: endDate.toISOString().split('T')[0] }
        if(genel.updateEl._id !== '') {
            payload = {
                _id: genel.updateEl._id, user:genel.updateEl.user, category, mission, name, surName, 
                start: startDate.toISOString().split('T')[0], 
                end: endDate.toISOString().split('T')[0]
            }
            dispatch(updateVeriler(genel.updateEl._id, payload, category, mission))
        } else {
           dispatch(setVerilerToDatabase(payload)); 
        } 
    }


    return (
        <div className="container" style={{marginLeft:"-10px", marginRight:"-10px"}}>
            <Tooltip 
                message ={genel.veri._id !== '' ? "Veriler Oluştu": ""} 
                onDeleteMessage = {()=> dispatch(setMessage())}
                data= {genel.veri}
            />
            <section className="pb-2" style={{borderBottom:"2px solid darkgray"}}> 
                <Heading text="Yeni Veri Girişi/Güncelleme" />
                <form onSubmit={onSubmitHandler}>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <Selector
                                title="Kategori"
                                items={kategorilerim} 
                                item={category}
                                onHandleVeri={onHandleVeri("category")}
                                error={categor}/>
                        </div>
                        <div className="col-md-6">
                            <Selector
                                title="Görevler"
                                items={kategoriler.missions} 
                                item={mission} 
                                onHandleVeri={onHandleVeri("mission")}
                                error={missio}/>
                        </div>
                    </div> 
                    <div className="row mt-3">
                            <div className="col-12 col-lg-6 px-0">
                                <InputText
                                col="col"
                                id="ad"
                                onChangeHandler={onHandleVeri("name")} 
                                val={name} 
                                label="Ad"
                                type="text"
                                error={nam}
                                />
                            </div>
                            <div className="col-12 col-lg-6 px-0">
                                <InputText
                                    col="col"
                                    id="soyad"
                                    onChangeHandler={onHandleVeri("surName")} 
                                    val={surName} 
                                    label="Soyad"
                                    type="text"
                                    error={surNam}
                                    />
                            </div>
                        </div>
                        <Tarih 
                            startDate={startDate} 
                            endDate={endDate} 
                            onChangeHandlerStart={(date) => setStartDate(date)}
                            onChangeHandlerEnd={(date) => setEndDate(date)}
                        />
                        <Button text = {genel.updateEl._id !== '' ? 'Güncelle': 'Kaydet'}/>
                     
                </form>
            </section>
            <VerilerList/>
        </div>
       
        
    )
}

export default VerilerCreate;