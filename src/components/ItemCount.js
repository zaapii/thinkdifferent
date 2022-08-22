import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {useContext, useState} from "react"
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Undo from '@mui/icons-material/Undo'
import {withSnackbar, useSnackbar} from 'notistack'
import {CartContext} from '../CartContext'


function ItemCount ({producto, initial, onAdd}) {

    const [value, setValue] = useState(initial)
    const {enqueueSnackbar} = useSnackbar()
    const {removeFromCart} = useContext(CartContext)

    const action = () => (
        <>
            <Button size="small" sx={{color: 'white'}} startIcon={<Undo />} onClick={() => {
                removeFromCart(producto.id)
                enqueueSnackbar(`${value} products removed from cart`, {variant: 'warning'})
                setValue(1)
            }}>
                Deshacer
            </Button>
        </>
    )

    // ADD ITEMS TO CART
    function addItems () {
        if(value > 0) {
            onAdd({producto: producto, quantity: value})
            enqueueSnackbar(`${value} ${producto.title} added to cart`, {action, variant: 'success'})
        } else {
            setValue(1)
            enqueueSnackbar(`Enter a valid quantity`, {action, variant: 'error'})
        }
    }

    // COUNTER + 1 WITH STOCK VALIDATION
    function addItem () {
        value < producto.stock ? setValue(parseInt(value) + 1) : setValue(producto.stock)
    }

    // COUNTER - 1
    function removeItem () {
        value > 0 ? setValue(parseInt(value) - 1) : setValue(0)
    }

    // VERIFY STOCK, IF AMOUNT EXCEEDS STOCK, IT SETS THE MAXIMUM STOCK
    function verifyStock (e) {
        if (e.target.value <= producto.stock) {
            setValue(e.target.value)
            return true
        } else {
            setValue(producto.stock)
            enqueueSnackbar(`Maximum stock exceeded. There are ${producto.stock} products available`, {variant: 'error'})
            return false
        }
    }

    return (
        <div>
            <Grid container spacing={2} sx={{alignItems: "center"}}>
                <Grid item md={3}>
                    <Box sx={{'& > :not(style)': {m: 1}}}>
                        <Fab size="small" color="primary" sx={{bgcolor: "black"}} aria-label="add" onClick={removeItem}>
                            <RemoveIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item md>
                    <TextField size="small" id="outlined-size-small" value={value} margin="normal" onChange={verifyStock} />
                </Grid>
                <Grid item md={3}>
                    <Box sx={{'& > :not(style)': {m: 1}}}>
                        <Fab sx={{bgcolor: "black"}} size="small" color="primary" aria-label="add" onClick={addItem}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item md={12}>
                    <Button sx={{width: '100%', color: "black"}} variant="outlined" onClick={addItems} startIcon={<AddShoppingCartIcon />}>
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withSnackbar(ItemCount)