import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAltKategorilerToDatabase, 
    stateId, stateMissionId, stateMission,
    updateAltKategoriler, stateCompleted } from '../../../features/veriler/kategorilerSlice';
import { setModalClose, modalState } from '../../../features/modal/modalSlice';

import InputText from '../inputUI/InputText';


export default function AltKategoriler() {

    const dispatch = useDispatch();
    const selectedId =  useSelector(stateId);
    const selectedMissionId =  useSelector(stateMissionId);
    const selectedMission =  useSelector(stateMission);
    const selectedCompleted = useSelector(stateCompleted);
    const selectedModalPos = useSelector(modalState);

    const [mission, setMission] = useState('');

    useEffect(() => {
        if (selectedMission) {
            setMission(selectedMission)
        } else if (selectedCompleted) {
            setMission('');
        }  
    }, [selectedMission, selectedCompleted])

    const onSubmitHandler = (e:any) => {
        e.preventDefault();
        const payload = { missionEl: mission };
        if(selectedMissionId) {
            dispatch(updateAltKategoriler(selectedId, selectedMissionId, payload))
        } else {
            dispatch(setAltKategorilerToDatabase(selectedId, payload)); 
        } 
    }


    return (
        <div className={selectedModalPos ? "modal fade show" : "modal fade"} tabIndex={-1} 
        style={selectedModalPos ? {display:"block", paddingRight:"15px"}: {display: "none"}}>
            <form onSubmit={onSubmitHandler}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Alt Başlık Ekle</h5>
                            <button type="button" 
                                className="close" 
                                onClick={()=> dispatch(setModalClose())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="form-row">
                                    <InputText
                                        col="col"
                                        id="mission"
                                        onChangeHandler={(e) => { setMission(e.target.value)}} 
                                        val={mission} 
                                        label="Görev/Makam"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                onClick={()=> dispatch(setModalClose())}
                                className="btn btn-secondary"> Kapat </button>
                            <button type="submit"  
                                className="btn btn-primary"> Ekle </button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            
       
        
    )
}

                          

