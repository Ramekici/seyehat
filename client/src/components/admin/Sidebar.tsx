import React from 'react';
import { useDispatch } from 'react-redux';
import { setGosterilen } from '../../features/veriler/verilerSlice';


interface SideBarsItems{
    goster:number;
    sidebars:Array<any>;
}

const Sidebar:React.FC<SideBarsItems> = ({goster, sidebars}) => {
    const dispatch = useDispatch();

    const degistir = (id:number) => {
        dispatch(setGosterilen(id));
    }

    return (
        <aside className="col-lg-3">
            <div className="nav nav-pills flex-column">
                { sidebars.map(side => {
                return (
                    <button 
                        className={goster === side.id ? "nav-link bg-secondary text-light mb-1":
                        "nav-link text-dark mb-1"} 
                        id={side.id} key={side.id} type="button" onClick={() => degistir(side.id)}
                        style={{zIndex: 5, position: "relative"}}> {side.name}
                    </button>) 
                })} 
            </div>
        </aside>
    )
}
export default Sidebar;