
import { useAuthState } from "react-firebase-hooks/auth";
import Grid2 from '@mui/material/Unstable_Grid2';
import { auth, db } from "../firebase";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import GenericCard from './GenericCard'
import BackToIndexButton from "./BackToIndexButton"

const Orders = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState(null)
    const { userId } = useParams()
    const [user] = useAuthState(auth)
    const [open, setOpen] = useState(false);
    const [modalOrder, setModalOrder] = useState(null)

    // FETCH ORDERS FROM FIREBASE
    async function getOrders() {
        setLoading(true)
        const orders = query(collection(db, "users"),
            where("uid", "==", userId))
        await getDocs(orders).then((snapshot) => {
            snapshot.docs.map(doc => {
                setOrders(doc.data().orders)
                setLoading(false)
            })
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    // TODO => SHOW ORDER DETAILS WITH PRODUCTS
    const viewOrder = (orderId) => {
        setModalOrder(orders.find(order => order.id === orderId))
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {loading && <LinearProgress color="error" />}
            <div>
                <Grid2 container sx={{ padding: 5 }}>
                    <Grid2 md={12} display="flex" justifyContent="center" alignItems="center">
                        <GenericCard>
                            {orders ?
                                <List sx={{ width: 1000, maxWidth: 1000, bgcolor: 'background.paper' }}>
                                    <h1>{user.displayName} Orders</h1>
                                    {orders.map(order => (
                                        <ListItem key={order.id} secondaryAction={
                                            <IconButton onClick={() => viewOrder(order.id)} edge="end" color="error" aria-label="delete">
                                                <PreviewIcon />
                                            </IconButton>
                                        }>
                                            <Grid2 container md={12} display="flex" justifyContent="center" alignItems="center">
                                                <Grid2 xs={5}>
                                                    <ListItemText primary="Order ID" secondary={order.id} sx={{ margin: 1 }} />
                                                </Grid2>
                                                <Grid2 xs={4}>
                                                    <ListItemText primary="Date" secondary={order.date} />
                                                </Grid2>
                                                <Grid2 xs={3}>
                                                    <ListItemText primary="Product Quantity" secondary={order.items.length} />
                                                </Grid2>
                                            </Grid2>
                                        </ListItem>
                                    ))}
                                    <Divider />
                                </List>
                                :
                                <div>
                                    <h3>No orders yet, buy something :)</h3>
                                    <BackToIndexButton />
                                </div>
                            }
                        </GenericCard>
                    </Grid2>
                </Grid2>
            </div>
            <div>
                {modalOrder && <Dialog
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`Order N° ${modalOrder.id} Details:`}</DialogTitle>
                    <DialogContent>
                        <List sx={{ width: 1150, maxWidth: 1150, bgcolor: 'background.paper' }}>
                            {modalOrder.items.map(item => (
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
                                <h1>{`Total: $ ${modalOrder.total}`}</h1>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                }
            </div>
        </div>
    );
}

export default Orders;