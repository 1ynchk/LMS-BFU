
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../../base-components/header'
import StudentMainPage from './student-components/StudentMainPage'
import { useEffect } from 'react'

const StudentRoot = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/student/main-page')
    }, [])
    
    return (
        <div className='container'>
            <div className='common__container'>
                <Header />
                <Routes>
                    <Route exact path='main-page/' element={<StudentMainPage />}/>
                </Routes>
            </div> 
        </div>
    )
} 

export default StudentRoot