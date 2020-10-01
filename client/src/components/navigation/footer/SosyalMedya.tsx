import React from 'react';
import {Link} from 'react-router-dom';

const SosyalMedya = (props: any) => {
    return (
        <li className="list-inline-item">
            <Link to={{
                pathname:props.link,
                state: { fromDashboard: true }
            }} 
            target="_blank" 
            title={props.title} 
            className="text-hover-primary text-info">
            <i className={props.clss}></i>
            </Link>
        </li>
    )
}
export default SosyalMedya;