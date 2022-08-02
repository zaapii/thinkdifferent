import Item from "./Item"
import Grid from '@mui/material/Grid'

function ItemList({productos, displayBadge, itemDetail}) {

    function addItemToCart(value) {
        displayBadge(value)
    }
    return ( 
        productos.map(product => (
            <Grid item md={3} key={product.id} >
                <Item itemDetail={itemDetail} addItemToCart={addItemToCart} producto={product} />
            </Grid>
        ))
    );
}

export default ItemList;