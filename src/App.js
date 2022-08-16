import './App.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import { SnackbarProvider } from 'notistack';
import { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'

function App () {
  const [itemQuantity, setitemQuantity] = useState(0)
  function displayBadge(value){
    setitemQuantity(value + itemQuantity)
  }
  function clearCart(){
    setitemQuantity(0)
  }
  return <>
  <BrowserRouter>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <NavBar itemQuantity={itemQuantity} clearCart={clearCart}/>
      <Routes>
        <Route exact path="/" element={<ItemListContainer displayBadge={displayBadge}/>}></Route>
        <Route exact path="/category/:category" element={<ItemListContainer displayBadge={displayBadge}/>}></Route>
        <Route exact path="/item/:productId" element={<ItemDetailContainer />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
    </SnackbarProvider>
  </BrowserRouter>
  </>
}

export default App
