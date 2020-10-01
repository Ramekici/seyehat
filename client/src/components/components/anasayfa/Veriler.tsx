import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import SelectedDate from '../date/SelectedDate';
import { setVeriTarih } from '../../../features/veriler/verilerSlice';

const Veriler: React.FC = () => {

    const [veriDate, setVeriDate] = useState(new Date());
    const onChangeHandler = (date: Date) => {
        setVeriDate(date);
    }
    const dispatch = useDispatch();


    return (
            <div className="my-3 py-3 px-3" style={{backgroundColor:"lightgray", borderRadius:"0.3rem"}}>
                <div className="row no-gutters">
                    <h3 className="display-5 mx-auto" style={{color:"chocolate"}}> Zamanda Seyahat </h3>
                    <p className="text-center"> 
                        Bir tarih seçin.
                        Bu tarihte neler olmuş?
                        Gazete manşetleri nasılmış?
                        Kim, nerede, ne kadar görevliymiş?
                        Merak ettiğiniz herşey...
                    </p>
                    <div className="row my-2 align-items-center">
                        <div className="col-8">
                            <SelectedDate
                            id="VerilerSayfasi"
                            date={veriDate} 
                            onChangeHandler={onChangeHandler}
                            minDate={new Date("1923/10/29")}
                            maxDate={new Date()}/>
                        </div>
                        <div className="col-4">
                         <button type="button" className="btn p-1 m-1" 
                             onClick={()=>dispatch(setVeriTarih(veriDate.toISOString().split("T")[0]))} 
                             style={{color:"#216ba5",display:"flex", alignItems:"center",
                                justifyContent:"space-around",
                                backgroundColor:"inherit", fontSize:"1.2rem"}}>
                                  <span>
                                      Getir
                                  </span>
                                <i className="fas fa-caret-right fa-2x ml-2"></i>
                        </button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
}
export default Veriler;