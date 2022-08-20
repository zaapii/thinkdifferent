import { useContext } from 'react'
import { CartContext } from '../CartContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid2 from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import { collection, addDoc, updateDoc, doc, query, where, getDocs, arrayUnion } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useSnackbar } from 'notistack';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GenericCard from './GenericCard';


const Cart = () => {

    let navigate = useNavigate();
    let userId = null;
    const { cart, cartTotal, removeFromCart, clearCart } = useContext(CartContext)
    const { enqueueSnackbar } = useSnackbar();
    const [user] = useAuthState(auth);

    function goToOrder(order) {
        navigate(`/order/${order.id}`)
    }

    const sendOrder = () => {
        if (!user) {
            enqueueSnackbar(`Para realizar una compra debe iniciar sesión con Google`, { variant: 'error' })
            return
        }
        // SE CREA EL OBJETO ORDER
        const order = {
            buyer: {
                name: user.displayName,
                email: user.email
            },
            items: cart.map(product => {
                return {
                    name: product.title,
                    price: product.price,
                    quantity: product.quantity,
                    id: product.id,
                    avatar: product.images[0],
                }
            }),
            total: cartTotal(),
            date: (new Date()).toDateString()
        }

        const ordersCollection = collection(db, "orders")
        addDoc(ordersCollection, order).then(async ({ id }) => {
            const orderWithId = {...order, id: id}
            // RESTA EL STOCK DEL PRODUCTO
            cart.forEach(product => {
                const oldStock = product.stock
                const itemDoc = doc(db, "items", product.id)
                updateDoc(itemDoc, { stock: parseInt(oldStock) - parseInt(product.quantity) })
            })

            // AGREGAMOS LA ORDEN RECIEN HECHA AL USUARIO
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            docs.forEach((doc) => {
                userId = doc.id
            });
            const userDoc = doc(db, "users", userId)
            updateDoc(userDoc, { orders: arrayUnion(orderWithId) })
            clearCart()

            // NAVEGA A LA VIEW DE LA ORDER
            goToOrder({ ...order, id: id })
        })
    }
    return (
        <Grid2 container sx={{ padding: 5 }}>
            <Grid2 md={12} display="flex" justifyContent="center" alignItems="center">
                <GenericCard>
                    {cart.length > 0 ?
                        <List sx={{ width: 1000, maxWidth: 1000, bgcolor: 'background.paper' }}>
                            {cart.map(product => (
                                <ListItem key={product.id} secondaryAction={
                                    <IconButton onClick={() => removeFromCart(product.id)} edge="end" color="error" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                                    <Grid2 container md={12} display="flex" justifyContent="center" alignItems="center">
                                        <Grid2 xs={1}>
                                            <ListItemAvatar>
                                                <Avatar src={product.images[0]} />
                                            </ListItemAvatar>
                                        </Grid2>
                                        <Grid2 xs={3}>
                                            <ListItemText primary="Product" secondary={product.title} sx={{ margin: 1 }} />
                                        </Grid2>
                                        <Grid2 xs={4}>
                                            <ListItemText primary="Description" secondary={`${product.description.substring(0, 50)}...`} />
                                        </Grid2>
                                        <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                            <ListItemText primary="Quantity" secondary={product.quantity} />
                                        </Grid2>
                                        <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                            <ListItemText primary="Price" secondary={`$ ${product.price}`} sx={{ margin: 1 }} />
                                        </Grid2>
                                        <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                            <ListItemText primary="SubTotal" secondary={`$ ${product.price * product.quantity}`} sx={{ margin: 1 }} />
                                        </Grid2>
                                    </Grid2>
                                </ListItem>
                            ))}
                            <Divider />
                            <ListItem sx={{ marginTop: 2 }}>
                                <h1>{`Total: $ ${cartTotal()}`}</h1>
                            </ListItem>
                            <ListItem sx={{ marginTop: 2 }}>
                                <Button onClick={sendOrder} sx={{ width: '100%', color: "black" }} variant="outlined" color="success" startIcon={<ShoppingCartCheckoutIcon />}>Finalizar Compra</Button>
                            </ListItem>
                        </List>
                        : <div>
                            <h1>No hay Productos</h1>
                            <NavLink style={{ textDecoration: 'none' }} to={`/`}>
                                <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="error" startIcon={<ArrowBackIcon />}>
                                    Volver al Índice
                                </Button>
                            </NavLink>
                        </div>
                    }
                </GenericCard>
            </Grid2>
        </Grid2>

    );
}

export default Cart;