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
import Verify from './pages/Verify'
import HojaCollection from './pages/Hoja'
import Pulseras from './pages/Pulseras'
import FloralCollection from './pages/Coleccion_floral'
import OvaloCollection from './pages/Ovalo'
import ElenaCollection from './pages/Elena'
import CascadaCollection from './pages/Cascada'
import ScrollToTopButton from './components/ScrollToTopButton'
import Sumup from './pages/Sumup'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ScrollToTopButton />
      <ScrollToTop />
      <ToastContainer />
      <NavBar/>
      <SearchBar />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/collection/collares' element={<Collares/>} />
      <Route path='/collection/pulseras' element={<Pulseras/>} />
      <Route path='/collection/pendientes' element={<Pendientes />} />
      <Route path='/collection/pendientes/aro' element={<AroCollection/>} />
      <Route path='/collection/pendientes/corazon' element={<CorazonCollection/>} />
      <Route path='/collection/pendientes/colette' element={<ColetteCollection/>} />
      <Route path='/collection/pendientes/gota' element={<GotaCollection/>} />
      <Route path='/collection/pendientes/lea' element={<LeaCollection/>} />

      <Route path='/collection/pendientes/ovalo' element={<OvaloCollection/>} />
      <Route path='/collection/pendientes/coleccion-floral' element={<FloralCollection/>} />
      <Route path='/collection/pendientes/elena' element={<ElenaCollection/>} />
      <Route path='/collection/pendientes/cascada' element={<CascadaCollection/>} />
      <Route path='/collection/pendientes/Hoja' element={<HojaCollection/>} />

      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/place-order' element={<PlaceOrder/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/privacy_policy' element={<Politica_privacidad/>} />
      <Route path='/delivery' element={<Detalles_envio/>} />
      <Route path='/verify' element={<Verify/>} />
      <Route path='/sumup' element={<Sumup/>} />
     </Routes>
     <Footer />
    </div>
  )
}

export default App
