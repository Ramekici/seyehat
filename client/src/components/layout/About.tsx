import React from 'react'

const About:React.FC = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <div className="card my-5" style={{border:"none"}}>
                        <div className="card-body">
                            <h4 className="card-title text-center text-warning"> Hakkımızda </h4>
                            <p className="card-text" style={{textIndent:"2rem", fontSize:"1.3rem", textAlign:"justify"}}>
                                Zamanda yolculuk, zaman içinde belirli noktalar arasındaki hareket, 
                                bir nesne ya da bir kişi tarafından uzayda farklı noktalar arasındaki 
                                harekete benzer şekilde, tipik olarak bir zaman makinesi 
                                veya bir solucan deliği olarak bilinen varsayımsal bir aygıtın 
                                kullanılması ile hareket kavramıdır. 
                                Zaman yolculuğu, felsefe ve kurguda yaygın olarak kabul gören bir kavramdır.

                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
    )
}

export default About;