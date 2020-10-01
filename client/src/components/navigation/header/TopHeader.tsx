import React from 'react';
import moment from 'moment';
import SosyalMedya from '../footer/SosyalMedya';
import {Datas} from '../datas/Datas';

export default function TopHeader() {
    moment.updateLocale('tr', {
        months : [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
            "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ],
        weekdays:[
            "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma" , "Cumartesi"
        ]
    });
    const date = moment().format("dddd, MMMM Do YYYY") ;
    
    return (
        <div className="topbar" style={{backgroundColor:"dimgray"}}>
            <div className="container py-1" style={{marginBottom:"0", paddingBottom:"0"}}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="text-left text-light">
                            {date}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="text-right">
                            <div className="list-inline">
                            {Datas.map(item => <SosyalMedya 
                                                            key={item.id} 
                                                            title={item.title}
                                                            clss={item.clss} 
                                                            link={item.link} />)}
                                        
                            </div>           
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    )
}
