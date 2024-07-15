import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.scss';
import AuthComponent from './components/Auth';
import Header from "./Header";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<AuthComponent/>}/>
        </Routes>
    </Router>
/*
<Header />*/
);

ReactDOM.render(<App />, document.getElementById('app'));
