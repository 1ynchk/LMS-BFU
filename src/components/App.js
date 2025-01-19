import '../common-static/css/index.css'
import { Route, Routes, useNavigate } from 'react-router-dom'

import LoginRoot from './Login/LoginRoot';
import AdminRoot from './Admin/AdminRoot';
import StudentRoot from './Student/StudentRoot';
import NotFound from '../base-components/main-page/404-not-found';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCheckLogin } from './../store/queries/Login/CheckLogin';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = localStorage.getItem('auth')

  useEffect(() => {
    if (auth) {
      dispatch(fetchCheckLogin())
    } else {
      navigate('/login')
    }
  }, [auth]) 

  return (
      <div className="App"> 
          <Routes>
              <Route exact path='/login' element={<LoginRoot />} />
              <Route exact path='/admin/*' element={<AdminRoot />} />
              <Route exact path='/student/*' element={<StudentRoot />} />   
              <Route path='*' element={<NotFound/>}/>
            </Routes>
      </div>
  )
}

export default App;
