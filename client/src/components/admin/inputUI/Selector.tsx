import React from 'react';

interface SelectItems{
    onHandleVeri(event:any): void;
    item: string;
    items: string[];
    title?: string;
    error?: any;
}

const Selector:React.FC<SelectItems> = ({ onHandleVeri, item, items, title, error }) => {
    

    return (
        <div className="mb-3">
            <label htmlFor={title}> {title} </label>
            <select className="custom-select" id={title} value={item}
                onChange={onHandleVeri}>
                <option selected value="">Seç...</option>
                {items ? items.map(item => {
                    return (<option value={item} > {item} </option>)
                }): null}
            </select>
            { error ? <div className="invalid-feedback" 
            style={{display:"block"}}> {error} </div> : null}
        </div>
    )
}
export default Selector;
