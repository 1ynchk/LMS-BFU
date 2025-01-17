import './admin-static/css/admin-root.css'

import { Routes, Route } from 'react-router-dom';
import Header from '../../base-components/header';

const AdminRoot = () => {
    return (
        <div className="adminroot">
            <div className='container'>
                <div className='common__container'>
                    <Header />        
                </div>
            </div>
        </div>
    )
}

export default AdminRoot