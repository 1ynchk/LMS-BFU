import '../common-static/css/index.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import LoginRoot from './Login/LoginRoot';
import AdminRoot from './Admin/AdminRoot';
import StudentRoot from './Student/StudentRoot';
import NotFound from '../base-components/main-page/404-not-found';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCheckLogin } from './../store/queries/Login/CheckLogin';
import LoadingScreen from '../base-components/loading/loading-screen';

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = localStorage.getItem('auth')
  const isLogin = useSelector(state => state.user.isLogin)
  const loading = useSelector(state => state.user.loading)

  useEffect(() => {

    if (auth) {
      dispatch(fetchCheckLogin())
    } else {
      navigate('/login')
    }
  }, [isLogin])

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login')
    }
  }, [])

  return (
    <div className="App">
      {
        loading && <LoadingScreen />
      }
      
      <Routes>
        <Route exact path='/login' element={<LoginRoot />} />
        <Route exact path='/admin/*' element={<AdminRoot />} />
        <Route exact path='/student/*' element={<StudentRoot />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
