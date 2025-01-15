import '../common-static/css/index.css'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LoginRoot from './Login/LoginRoot';

function App() {
  return (
    <BrowserRouter>
      <div className="App"> 

        <Routes>
          <Route exact path='/login' element={<LoginRoot />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
