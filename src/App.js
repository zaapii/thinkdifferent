import './App.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import { SnackbarProvider } from 'notistack';
import { useState } from "react"

function App () {
  const [itemQuantity, setitemQuantity] = useState(0)
  function displayBadge(value){
    setitemQuantity(value + itemQuantity)
  }
  function clearCart(){
    setitemQuantity(0)
  }
  return <>
  <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
    <NavBar itemQuantity={itemQuantity} clearCart={clearCart}/>
    <ItemListContainer displayBadge={displayBadge}/>
  </SnackbarProvider>
  </>
}

export default App
