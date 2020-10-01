import React from 'react';
import TarihteBugun from '../components/anasayfa/TarihteBugun';
import Veriler from '../components/anasayfa/Veriler';
import Kronoloji from '../components/anasayfa/Kronoloji';
import GazeteManset from '../components/anasayfa/GazeteManset';
import VeriData from '../components/anasayfa/VeriData';
import {VeriDatas} from '../../features/interfaces/veriInterface';


const Main:React.FC<VeriDatas> = () => {

    return (
        <div style={{backgroundColor:"ghostwhite"}}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <Veriler/>
                        <TarihteBugun/>
                        <Kronoloji/>
                        <GazeteManset/>
                    </div>
                    <div className="col-lg-8 col-sm-12 mt-4">
                        <VeriData/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main;