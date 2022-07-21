import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button'
const CartWidget = () => {
    return (
        <Button color="error" variant="outlined" sx={{marginRight: 5}}>
            <ShoppingCartIcon sx={{color:"white"}}/>
        </Button>
    )
}

export default CartWidget