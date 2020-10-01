import React from 'react';
import Header from '../navigation/header/Header';
import Footer from '../navigation/footer/Footer';
import Backdrop from '../UI/Backdrop';
import TopHeader from '../navigation/header/TopHeader';

const Layout:React.FC = (props:any) => {

    return (
        <div>
            <Backdrop/>
            <TopHeader/>
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
        
    )
}

export default Layout;
