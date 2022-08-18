import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react'
import { CartContext } from '../CartContext'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
const CartWidget = () => {
    const { cartTotalProducts, cart } = useContext(CartContext)

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
        cart.length > 0 &&
        <NavLink to={'/cart'}>
            <IconButton color="error" variant="outlined" sx={{ marginRight: 5 }} aria-label="cart">
                <StyledBadge badgeContent={cartTotalProducts()} color="success">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                </StyledBadge>
            </IconButton>
        </NavLink>
    )
}

export default CartWidget