import './App.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'
import CartProvider from './CartContext'
import Order from './components/Order'
import Orders from './components/Orders'

function App() {

  return <>
    <BrowserRouter>
        <CartProvider>
          <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<ItemListContainer />}></Route>
              <Route exact path="/category/:category" element={<ItemListContainer />}></Route>
              <Route exact path="/item/:productId" element={<ItemDetailContainer />}></Route>
              <Route exact path="/cart" element={<Cart />}></Route>
              <Route exact path="/order/:orderId" element={<Order />}></Route>
              <Route exact path="/orders/:userId" element={<Orders />}></Route>
            </Routes>
          </SnackbarProvider>
        </CartProvider>
    </BrowserRouter>
  </>
}

export default App
