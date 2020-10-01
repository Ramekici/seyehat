import React from 'react';
import SelectedDate from '../../components/date/SelectedDate';

interface TarihItems{
    startDate: Date;
    endDate: Date;
    onChangeHandlerStart(date:Date): void;
    onChangeHandlerEnd(date:Date): void;
}

const Tarih:React.FC<TarihItems> = ({startDate, endDate, onChangeHandlerStart, onChangeHandlerEnd}) => {
    console.log(startDate, endDate, onChangeHandlerStart, onChangeHandlerEnd);
    return (
                        <div className="row mt-3">
                            <div className="col-12 col-lg-6">
                                <div>
                                    <label htmlFor="startDate" 
                                    className="px-1 ">Görev Başl. Tarihi</label> 
                                </div>
                                <SelectedDate 
                                    minDate={new Date("10/10/1921")}
                                    maxDate={new Date() && endDate}
                                    id="tarihItem1"
                                    date={startDate}
                                    onChangeHandler={onChangeHandlerStart}/>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div>
                                   <label htmlFor="endDate" 
                                    className="px-1">Görev Bitiş Tarihi</label> 
                                </div>
                                <SelectedDate 
                                    minDate={new Date("10/10/1921") && startDate}
                                    maxDate={new Date()}
                                    id="tarihItem2"
                                    date={endDate}
                                    onChangeHandler={onChangeHandlerEnd}/>
                            </div>
                        </div>
    )
}
export default Tarih;