import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// @ts-ignore
//import Auth from './components/Auth';
// @ts-ignore
import Header from './remote/Header';

const App = () => (
    /*    <Router>
            <Routes>
                <Route path="/" element={<Auth/>}/>
            </Routes>
        </Router>*/
    <Header/>
);

ReactDOM.render(<App />, document.getElementById('app'));
