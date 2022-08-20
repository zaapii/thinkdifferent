import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, auth } from '../firebase'
import LinearProgress from '@mui/material/LinearProgress';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Alert, AlertTitle, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuthState } from "react-firebase-hooks/auth";

const Order = () => {
    const { orderId } = useParams()
    const [user] = useAuthState(auth);
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));

    async function getOrder() {
        setLoading(true)
        const item = doc(db, "orders", orderId)
        await getDoc(item).then((snapshot) => {
            if (snapshot.exists()) {
                setOrder({ id: orderId, ...snapshot.data() })
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div>
            {loading && <LinearProgress color="error" />}
            {order &&
                <Grid2 container sx={{ padding: 5 }}>
                    <Grid2 md={12} display="flex" justifyContent="center" alignItems="center">
                        <Item>
                        <Alert severity="success" variant="filled">
                            ¡Orden recibida correctamente! — Recibiras las instrucciones para el envio de la compra a tu email: <strong>{user.email}</strong>
                        </Alert>
                            <h2>Datos de la orden N° {order.id}: </h2>
                            <List sx={{ width: 1000, maxWidth: 1000, bgcolor: 'background.paper' }}>
                                {order.items.map(item => (
                                    <ListItem key={item.id}>
                                        <Grid2 container md={12} display="flex" justifyContent="center" alignItems="center">
                                            <Grid2 xs={1}>
                                                <ListItemAvatar>
                                                    <Avatar src={item.avatar} />
                                                </ListItemAvatar>
                                            </Grid2>
                                            <Grid2 xs={3}>
                                                <ListItemText primary="ID de compra" secondary={item.id} sx={{ margin: 1 }} />
                                            </Grid2>
                                            <Grid2 xs={4}>
                                                <ListItemText primary="Name" secondary={item.name} />
                                            </Grid2>
                                            <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                                <ListItemText primary="Quantity" secondary={item.quantity} />
                                            </Grid2>
                                            <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                                <ListItemText primary="Price" secondary={`$ ${item.price}`} sx={{ margin: 1 }} />
                                            </Grid2>
                                            <Grid2 sx={{ marginLeft: 2 }} xs={1}>
                                                <ListItemText primary="SubTotal" secondary={`$ ${item.price * item.quantity}`} sx={{ margin: 1 }} />
                                            </Grid2>
                                        </Grid2>
                                    </ListItem>
                                ))}
                                <Divider />
                                <h2 style={{ marginTop: 50 }}>Datos del comprador: </h2>
                                <ListItem key={user.id}>
                                    <Grid2 container md={12} display="flex" justifyContent="center" alignItems="center">
                                        <Grid2 xs={1}>
                                            <ListItemAvatar>
                                                <Avatar src={user.photoURL} />
                                            </ListItemAvatar>
                                        </Grid2>
                                        <Grid2 xs={4}>
                                            <ListItemText primary="Name" secondary={user.displayName} />
                                        </Grid2>
                                        <Grid2 xs={1}>
                                            <ListItemText primary="Email" secondary={user.email} />
                                        </Grid2>
                                    </Grid2>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ marginTop: 2 }}>
                                    <h1>{`Total de la compra: $ ${order.total}`}</h1>
                                </ListItem>
                            </List>
                        </Item>
                    </Grid2>
                </Grid2>
            }
        </div>
    )
}

export default Order;