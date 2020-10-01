import React, {useState } from 'react';
import SelectedDate from '../../components/date/SelectedDate';
import Heading from '../inputUI/Heading';

export default function DigerList() {
    
    const [inter, setInter] = useState(new Date());

    return (
        <section className="mt-3">
            <Heading text="Diğer Bilgiler" />
            <div className="row">
                <div className="col-6">
                    <SelectedDate
                    id="digerliste"
                    onChangeHandler={(date) => setInter(date)} 
                    date={inter}/>
                </div>     
            </div>
            <div className="row mt-3">
                <div className="col-12">
                Diğer Bilgiler
                </div>
            </div>
        </section>
    )
}
