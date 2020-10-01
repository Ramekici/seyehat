import React from 'react';
import {useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import VerilerCreate from './veriler/VerilerCreate';
import TarihteBugun from './tariteBugun/TarihteBugun';
import KategoriGir from './kategoriler/KategoriGir';
import {stateDatas} from '../../features/veriler/verilerSlice';
import GazeteVerileri from './gazeteManset/GazeteVerileri';
import Diger from './diger/Diger';;

export default function Admin() {

    const gosteri = useSelector(stateDatas);
    const sidebars = [
        { name: "Kategoriler", id:1},
        { name: "Veriler", id:2},
        { name: "Tarihte Bugün", id:3},
        { name: "Gazete Manşetleri", id:4},
        { name: "Diğer Bilgiler", id:5},
    ]

    let gosterilen;
    if (gosteri.gosterilen === 1){
        gosterilen = <KategoriGir/>
    } else if ( gosteri.gosterilen === 2) {
        gosterilen = <VerilerCreate/>
    } else if ( gosteri.gosterilen === 3) {
        gosterilen = <TarihteBugun/>
    } else if ( gosteri.gosterilen === 4) {
        gosterilen = <GazeteVerileri/>
    } else if ( gosteri.gosterilen === 5) {
        gosterilen = <Diger/>
    }

    return (
        <section className="py-5"  style={{backgroundColor:"#fdf9f9"}}>
            <div className="container">
                <div className="row">
                    <Sidebar goster={gosteri.gosterilen} sidebars={sidebars}/>
                    <div className="col-lg-9">
                        {gosterilen}
                    </div>
                </div>
            </div>
        </section>   
    )
}
