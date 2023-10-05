import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

interface RouterProps {}

const Router: FC<RouterProps> = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='*' element={<h1>Not Fount</h1>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<h1>Home</h1>}/>
        </Routes>
    );
}

export default Router;
