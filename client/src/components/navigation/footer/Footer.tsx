import React from 'react'
import SosyalMedya from './SosyalMedya';
import {Datas} from '../datas/Datas';

const Footer:React.FC = () => {

    return (
        <footer className="position-relative z-index-10 d-print-none pt-3" 
        style={{backgroundColor:"dimgray"}}>
            <div className="py-6 bg-gray-400 text-light">
                <div className="container">
                    <div className="row">
                        <div className="mb-5 mb-lg-0 col-lg-4">
                            <div className="font-weight-bold text-uppercase text-light mb-3">Hakkımızda</div>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            <ul className="list-inline">
                                {Datas.map(item => <SosyalMedya 
                                                        key={item.id} 
                                                        title={item.title}
                                                        clss={item.clss}
                                                        link={item.link} />)}
                                
                            </ul>
                        </div>
                        <div className="mb-5 mb-lg-0 col-md-6 col-lg-4">
                            <div className="font-weight-bold text-uppercase text-light mb-3">Kategoriler</div>
                                <ul className="list-unstyled">
                                    <li><a className="text-light" href="/">Yerel</a></li>
                                    <li><a className="text-light" href="/category-rooms">Ulusal</a></li>
                                </ul>
                            </div>
                            <div className="mb-5 mb-lg-0 col-md-6 col-lg-4">
                                <div className="font-weight-bold text-uppercase text-light mb-3"> Gazete Manşetleri </div>
                                    <ul className="list-unstyled">
                                        <li><a className="text-light" href="/text">Text page</a></li>
                                        <li><a className="text-light" href="/faq">F.A.Q.s</a></li>
                                        <li><a className="text-light" href="/coming-soon">Coming soon</a></li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="py-4 font-weight-light text-light">
                            <div className="container">
                                <div className="align-items-center row">
                                    <div className="text-center text-md-left col-md-6">
                                        <p className="text-sm mb-md-0">© 2020, Zamanda Seyahat bütün hakları saklıdır.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
    )
}

export default Footer;