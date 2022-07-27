import Producto from "./Producto"
import Grid from '@mui/material/Grid'
function ItemList({productos, displayBadge}) {
    function addItemToCart(value) {
        displayBadge(value)
    }
    return ( 
        productos.map(product => (
            <Grid item md={3}>
                <Producto addItemToCart={addItemToCart} key={product.id} producto={product} />
            </Grid>
        ))
    );
}

export default ItemList;