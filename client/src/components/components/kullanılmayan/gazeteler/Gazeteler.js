import React,{ useEffect } from 'react'
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHaberlerData, sonDakika, getEkonomiData } from '../../../../features/haberler/haberlerSlice';


export default function Gazeteler() {

    const dispatch = useDispatch();
    const haberlerim  = useSelector(sonDakika);
    useEffect(() => {
        dispatch(getHaberlerData());
        dispatch(getEkonomiData());
    }, [])
    let elemen = haberlerim.map(item => {
        return (
            <div className="col-3"  key={item.key}>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title"> {item.name} </h5>
                    <p className="card-text"> {item.description} </p>
                    <Link to={item.url} className="card-link"> {item.url} </Link>
                    </div>
                </div>
            </div>)
    })
    return (
        <div className="container">
            <div className="row">
                {elemen}  
            </div>
        </div>
        
    )
}
