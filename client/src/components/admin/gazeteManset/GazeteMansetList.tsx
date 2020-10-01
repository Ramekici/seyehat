import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGazeteler, stateSpecificNews, 
    deleteGazeteler, setUpdateEl} from '../../../features/veriler/gazetelerSlice';
import SelectedDate from '../../components/date/SelectedDate';
import Heading from '../inputUI/Heading';


export default function GazeteMansetList() {

    const dispatch = useDispatch();
    const news = useSelector(stateSpecificNews);
    const [inter, setInter] = useState(new Date());
    useEffect(() => {
        dispatch(getGazeteler(inter))
    }, [inter, dispatch])
    return (
        <section className="mt-3">
            <Heading text="Günlük Gazete Manşetleri"/>
            <div className="row">
                <div className="col-6">
                    <SelectedDate
                    id="gazete_manset"
                    onChangeHandler={(date) => setInter(date)} 
                    date={inter}/>
                </div>     
            </div>
            <div className="row mt-3">
                <div className="col-12">
                { news ? 
                    <div className="list-group">
                        {news.map(item => {
                        return(
                        <div className="list-group-item list-group-item-action" >
                            <div className="row">
                            <div className="col-lg-8">  
                                <div className="list-item"> <span style={{color:"red"}}> Manşet: </span> {item.title} </div>
                                <div className="list-item"> <span style={{color:"red"}}> Gazete Adı: </span> {item.name}</div>
                                <div className="list-item"> <span style={{color:"red"}}> Gazete Sahibi: </span> {item.owner}</div>
                                <div className="list-item"> <span style={{color:"red"}}> Açıklama: </span> {item.description}</div>
                                <div className="list-item">  <span style={{color:"red"}}> Tarih: </span> {item.date}</div>
                            </div>
                            <div className="col-lg-4 d-block" >
                                <button className="btn btn-sm btn-warning m-2 p-1"
                                onClick={()=> {dispatch(setUpdateEl(item._id))}}> Güncelle </button>
                                <button className="btn btn-sm btn-danger m-2 p-1"
                                onClick={()=> {dispatch(deleteGazeteler(item._id, item.date))}}> Sil </button>
                            </div> 
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
