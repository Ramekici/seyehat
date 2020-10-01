import React from 'react';
import {Datas} from '../../../features/interfaces/veriInterface';

interface TooltipItems{
    message: string; 
    onDeleteMessage(): void;
    data:Datas
}

const Tooltip:React.FC<TooltipItems> = ({message, onDeleteMessage, data}) => {
    return (
        <div aria-live="polite" aria-atomic="true">
            <div className={message ? "toast show" :"toast"} 
                style={{zIndex:1000, position: "absolute", top: "0", right: "0"}}>
                <div className="toast-header">
                    <strong className="mr-auto text-capitalize">
                        {message}
                    </strong>
                    <button type="button" onClick={onDeleteMessage}
                        className="ml-2 mb-1 close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    <ul style={{listStyle:"none", paddingLeft:"0"}}>
                        <li className="p-1"> Kategori: {data ? data.category: null} </li>
                        <li className="p-1"> Makam: {data ? data.mission: null} </li>
                        <li className="p-1 text-capitalize"> Ad: {data ? data.name: null} </li>
                        <li className="p-1 text-uppercase"> Soyad: {data ? data.surName : null} </li>
                        <li className="p-1"> Başlangıç : {data ? data.start : null} </li>
                        <li className="p-1"> Bitiş : {data ? data.end : null} </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Tooltip;