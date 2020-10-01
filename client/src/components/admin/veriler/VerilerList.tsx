import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Selector from '../inputUI/Selector';
import { getVerilerOzel, deleteVeriler, setUpdateEL, stateDatas} from '../../../features/veriler/verilerSlice';

import { stateCategory, setMissionsAlt} from '../../../features/veriler/kategorilerSlice';
import Heading from '../inputUI/Heading';

export default function VerilerList() {

    const [veri, setVeri] = useState({category:'', mission:''});
    const {category, mission} = veri;
    const dispatch = useDispatch();

    //// redux store
    const genel = useSelector(stateDatas);
    const kategoriler = useSelector(stateCategory);

    ///////

    let kategorilerim: any = [];
    kategoriler.kategoriler.map(item => kategorilerim.push(item.category));

    useEffect(() => {
        dispatch(setMissionsAlt(category))  
    }, [category, dispatch])

    useEffect(() => {
        dispatch(getVerilerOzel(category, mission));
    },[mission, category, dispatch])

    const onHandleVeri = (name:string) => (event:any) => {
        return setVeri({...veri, [name]: event.target.value})
    }


    let veriler = genel.verilerOzel ? genel.verilerOzel.map(item => {
        return(
            <tbody>
                <tr>
                    <td> { item.name } </td>
                    <td> { item.surName } </td>
                    <td> { item.start } </td>
                    <td> { item.end} </td>
                    <td style={{justifyContent:"space-around"}}> 
                        <button
                            onClick={() => dispatch(setUpdateEL(item._id))}>
                            <i className="far fa-edit"></i>
                        </button>
                        <button 
                            onClick={()=>{dispatch(deleteVeriler(item._id, category, mission))}}> 
                        <i className="far fa-trash-alt"></i> 
                        </button>
                    </td>
                </tr>
            </tbody>)}): null;
    
    return (
        <section className="my-3">
            <Heading text="Verileri Listeleme" />
            <div className="row">
                <div className="col-md-6">
                    <Selector
                        onHandleVeri={onHandleVeri("category")} 
                        item={category} 
                        items={kategorilerim}/>
                </div>
                <div className="col-md-6">
                    <Selector 
                        onHandleVeri={onHandleVeri("mission")}
                        item={mission} 
                        items={kategoriler.missionsAlt}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12" style={{overflowX:"auto"}}>
                <table className="table table-striped dt-responsive nowrap w-100 text-center">
                    <thead>
                        <tr>
                            <th>Ad</th><th>Soyad</th><th>Grv. Başlangıç</th>
                            <th> Grv. Bitiş</th><th> İşlemler </th>
                        </tr>
                    </thead>
                    {veriler}
                </table>
                </div>
            </div>
        </section>
    )
}
