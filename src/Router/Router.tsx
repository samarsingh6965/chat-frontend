import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import TermsAndConditions from '../Pages/TermsAndConditions';
import Home from '../Home/Home';
import RightBar from '../Pages/RightBar';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='*' element={<h1>Not Fount</h1>} />
            <Route path='/register' element={<Register />} />
            <Route path='/terms&conditions' element={<TermsAndConditions />} />
            <Route path='/home' element={<Home />}>
                <Route path='chat/:userId' element={<RightBar />} />
            </Route>
        </Routes>
    );
}

export default Router;
