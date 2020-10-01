import React from 'react';

interface InputItems{
    col:string;
    id: string;
    onChangeHandler(event:any): void;
    val: string;
    label: string;
    type:string;
    metin?:boolean;
    error?:any
}

const InputText:React.FC<InputItems> = 
    ({col, id, onChangeHandler, val, label, type, metin, error}) => {
    return (
        <div className={col}>
            <label htmlFor={id}>{label}</label>
            {!metin ? 
            <input 
                type={type}
                onChange={onChangeHandler}
                value={val}
                className="form-control" 
                placeholder={label}
                id={id}/>
            : <textarea
                rows={4} 
                cols={50}
                onChange={onChangeHandler}
                value={val}
                className="form-control" 
                placeholder={label}
                id={id}
            />}
            { error ? <div className="invalid-feedback" 
            style={{display:"block"}}> {error} </div> : null}
            
        </div>
    )
}
export default InputText;