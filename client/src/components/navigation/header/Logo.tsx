import React from 'react'
import Zaman from '../../../assets/zamandayolculuk.png';

const Logo:React.FC = () => {
    return (
        <div className="d-flex" style={{alignItems:"flex-end", justifyContent: "space-around"}}>
            <div>
               <img src={Zaman} alt='...'/> 
            </div>
            <div style={{fontSize:"1.3rem", paddingBottom:"0", 
            marginLeft:"0.2rem", textAlign:"center", color:"chocolate"}}>
                <div> Zamanda </div>
                <div> Seyahat </div> 
            </div>
        </div>
    )
}
export default Logo;