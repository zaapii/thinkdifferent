import Item from "./Item"
import Grid from '@mui/material/Grid'

function ItemList({productos, itemDetail}) {
    
    return ( 
        productos.map(product => (
            <Grid item md={3} key={product.id} >
                <Item itemDetail={itemDetail} producto={product} />
            </Grid>
        ))
    );
}

export default ItemList;