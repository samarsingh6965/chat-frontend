import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

interface RouterProps {}

const Router: FC<RouterProps> = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    );
}

export default Router;
