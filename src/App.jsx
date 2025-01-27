import { Route, Routes } from 'react-router-dom'
import './App.css'
import Virtual_card from './components/Virtual_card'
import Home from './pages/Home'

function App() {

  return (
    <>
      <div className=''>
      
      </div>
      <Routes>
        <Route path='/test' element={<Home/>}/>
        <Route path='/' element={<Virtual_card/>}/>
      </Routes>
    </>
  )
}

export default App
