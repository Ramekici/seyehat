import React from 'react';
import { useDispatch} from 'react-redux';
import { messageReset } from '../../../features/auth/authSlice';


export default function Toast({message}) {
    const dispatch = useDispatch();

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-10 m-auto text-orange text-center">
                    {message}
                </div>
                <div className="col-1 m-auto">
                    <button type="button" className="close" onClick= {()=> dispatch(messageReset())}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
