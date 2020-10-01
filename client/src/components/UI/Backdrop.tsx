import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { modalState } from '../../features/modal/modalSlice';

export default function Backdrop() {
    const modalPos = useSelector(modalState);

    const [backdropStatus, setbackdropStatus] = useState("");
    useEffect(() => {
        if(modalPos) {
            setbackdropStatus("modal-backdrop fade show")
        } else {
            setbackdropStatus("")
        } 
    }, [modalPos])

    return (
        <div className={backdropStatus}>
        </div>
    )
}