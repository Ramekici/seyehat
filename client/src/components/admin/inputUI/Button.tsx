import React from 'react';

interface TextNode{
    text:string
}

const Button:React.FC<TextNode>=({text})=> {
    return (
        <div className="row mt-3" 
            style={{display:"flex", justifyContent:"flex-end", margin:"0.3rem"}}>
            <button type="submit" className="btn btn-info"> {text} </button>
        </div>
        
    )
}


export default Button;