import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


import Layout from './components/layout/Layout';
import Main from './components/layout/Main';
import Admin from './components/admin/Admin';
import Auth from './components/auth/Auth';
import About from './components/layout/About';
import './App.css';

const App:React.FC = (props) => {

  let routes =
        (<Switch>
          <Route exact path="/" component={Main}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/authenticate' component={Auth}/>
          <Route path='/hakkımızda' component={About}/>
          <Redirect to='/'/>
        </Switch>) ;
  return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter> 
  );
}

export default App;

