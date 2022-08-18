import { useContext } from 'react'
import { CartContext } from '../CartContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

const Cart = () => {

    const { cart, cartTotal, removeFromCart } = useContext(CartContext)

    function remove(productId) {
        console.log(productId)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));
    return (
        <Grid2 container sx={{ padding: 5 }}>
            <Grid2 md={12} display="flex" justifyContent="center" alignItems="center">
                <Item>
                    {cart.length > 0 ?
                        <List sx={{ width: 1000, maxWidth: 1000, bgcolor: 'background.paper' }}>
                            {cart.map(product => (
                                <ListItem keyt={product.id} secondaryAction={
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
                                <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="success" startIcon={<ShoppingCartCheckoutIcon />}>Finalizar Compra</Button>
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
                </Item>
            </Grid2>
        </Grid2>


    );
}

export default Cart;