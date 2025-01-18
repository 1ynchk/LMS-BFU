import '../common-static/css/index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import LoginRoot from './Login/LoginRoot';
import AdminRoot from './Admin/AdminRoot';
import StudentRoot from './Student/StudentRoot';
import NotFound from '../base-components/main-page/404-not-found';

function App() {

  return (
    <BrowserRouter>
      <div className="App"> 
          <Routes>
              <Route exact path='/login' element={<LoginRoot />} />
              <Route exact path='/admin/*' element={<AdminRoot />} />
              <Route exact path='/student/*' element={<StudentRoot />} />   
              <Route path='*' element={<NotFound/>}/>
            </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
