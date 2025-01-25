import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AroCollection from './pages/Aro'
import Pendientes from './pages/Pendientes'
import LeaCollection from './pages/Lea'
import GotaCollection from './pages/Gota'
import ColetteCollection from './pages/Colette'
import CorazonCollection from './pages/Corazon'
import Collares from './pages/Collares'
import Politica_privacidad from './pages/Politica_privacidad'
import Detalles_envio from './pages/DetallesEnvio'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ScrollToTop />
      <ToastContainer />
      <NavBar/>
      <SearchBar />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/collection/collares' element={<Collares/>} />
      <Route path='/collection/pulseras' element={<Collection/>} />
      <Route path='/collection/pendientes' element={<Pendientes />} />
      <Route path='/collection/pendientes/aro' element={<AroCollection/>} />
      <Route path='/collection/pendientes/corazon' element={<CorazonCollection/>} />
      <Route path='/collection/pendientes/colette' element={<ColetteCollection/>} />
      <Route path='/collection/pendientes/gota' element={<GotaCollection/>} />
      <Route path='/collection/pendientes/lea' element={<LeaCollection/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/place-order' element={<PlaceOrder/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/privacy_policy' element={<Politica_privacidad/>} />
      <Route path='/delivery' element={<Detalles_envio/>} />
     </Routes>
     <Footer />
    </div>
  )
}

export default App
