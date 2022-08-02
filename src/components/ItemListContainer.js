import axios from 'axios'
import {makeStyles} from "@mui/styles"
import {useEffect, useState} from "react"
import ItemList from './ItemList'
import Grid from '@mui/material/Grid'
import ItemDetailContainer from './ItemDetailContainer'


const useStyles = makeStyles({
    gridContainer: {
        padding: 80
    }
})
const ItemListContainer = ({displayBadge}) => {
    function addItemToCart(value) {
        displayBadge(value)
    }
    const itemDetail = (producto) => {
        setOpen(true)
        setProducto(producto)
    }
    
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState({})
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const classes = useStyles();
    useEffect(() => {
        axios('https://dummyjson.com/products')
        .then((response) => {
            setProductos(response.data.products)
        })
    }, [])
    
    return (
        <Grid
            container
            spacing={4}
            rowSpacing={4}
            className={classes.gridContainer}
            justify="center"
        >
            <ItemDetailContainer producto={producto} open={open} handleClose={handleClose} />
            <ItemList itemDetail={itemDetail} productos={productos} displayBadge={addItemToCart} />
        </Grid>
    )
}

export default ItemListContainer