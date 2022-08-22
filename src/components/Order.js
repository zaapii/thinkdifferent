import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, auth } from '../firebase'
import LinearProgress from '@mui/material/LinearProgress';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Alert, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import GenericCard from './GenericCard'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Order = () => {

    const MySwal = withReactContent(Swal)
    const { orderId } = useParams()
    const [user] = useAuthState(auth);
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)

    // FETCH THE ORDER FROM FIREBASE
    async function getOrder() {
        setLoading(true)
        MySwal.fire({
            title: <p>The order is being processed, please wait...</p>,
            icon: "success",
            didOpen: () => {
                MySwal.showLoading()
            }
        })
        const item = doc(db, "orders", orderId)
        await getDoc(item).then((snapshot) => {
            if (snapshot.exists()) {
                setOrder({ id: orderId, ...snapshot.data() })
                setLoading(false)
                MySwal.fire({
                    title: <p>¡Order placed successfully!</p>,
                    icon: "success",
                    confirmButtonText: 'Cool'
                })
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
                        <GenericCard>
                            <Alert severity="success" variant="filled">
                                Order received successfully! — You will receive the instructions for products shipping to your email: <strong>{user.email}</strong>
                            </Alert>
                            <h2>Order N° {order.id}: </h2>
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
                                <h2 style={{ marginTop: 50 }}>Buyer Data: </h2>
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
                                    <h1>{`Total: $ ${order.total}`}</h1>
                                </ListItem>
                            </List>
                        </GenericCard>
                    </Grid2>
                </Grid2>
            }
        </div>
    )
}

export default Order;