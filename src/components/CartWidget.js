import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const CartWidget = ({itemQuantity}) => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
        <div>
        <IconButton color="error" variant="outlined" sx={{ marginRight: 5 }} aria-label="cart">
            <StyledBadge badgeContent={itemQuantity} color="secondary">
                <ShoppingCartIcon sx={{ color: "white" }} />
            </StyledBadge>
        </IconButton>
        </div>
    )
}

export default CartWidget