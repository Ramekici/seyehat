import React from 'react';

const GazeteManset:React.FC = () => {
    return (
        <div className="card mt-3" style={{backgroundColor:"tan"}}>
            <div className="card-body">
            <h5 className="card-title text-center"> Gazete Manşetleri </h5>
                <ul className="list-group list-group-flush" >
                        <li className="list-group-item"  style={{backgroundColor:"inherit"}}>
                            <h6> Başlık </h6>
                            <p>  Metin </p>
                        </li>            
                </ul>
            </div>
        </div>
    )
}

export default GazeteManset;