
import { useAuthState } from "react-firebase-hooks/auth";
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { auth, db } from "../firebase";
import { Divider, IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';

const Orders = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState(null)
    const { userId } = useParams()
    const [user] = useAuthState(auth)

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

    const viewOrder = (orderId) => {
        console.log(orderId)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));

    return (
        <div>
            {loading && <LinearProgress color="error" />}
            {orders &&
                <div>
                    <Grid2 container sx={{ padding: 5 }}>
                        <Grid2 md={12} display="flex" justifyContent="center" alignItems="center">
                            <Item>
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
                            </Item>
                        </Grid2>
                    </Grid2>
                </div>
            }
        </div>
    );
}

export default Orders;