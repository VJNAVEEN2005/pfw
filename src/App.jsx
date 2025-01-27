import { Route, Routes } from 'react-router-dom'
import './App.css'
import Virtual_card from './components/Virtual_card'
import Home from './pages/Home'
import Product_details from './pages/Product_details'
import Cart from './pages/Cart'
import Category_page from './pages/Category_page'

function App() {

  return (
    <>
      <div className=''>
      
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product_details/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/:detail/:id' element={<Category_page/>}/>
        <Route path='/test' element={<Virtual_card/>}/>
      </Routes>
    </>
  )
}

export default App
