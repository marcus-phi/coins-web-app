import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>

                <Routes>
                    <Route path="/" element={<List/>} exact/>
                    <Route path="/currency/:id" element={<Detail/>} exact/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);