import axios from 'axios'
import {makeStyles} from "@mui/styles"
import {useEffect, useState} from "react"
import ItemList from './ItemList'
import Grid from '@mui/material/Grid'
import {useParams} from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton'

const useStyles = makeStyles({
    gridContainer: {
        padding: 80
    }
})
const ItemListContainer = ({displayBadge}) => {

    const {category} = useParams()
    const [productos, setProductos] = useState([])

    function addItemToCart (value) {
        displayBadge(value)
    }

    const filterByCategory = (productos) => {
        if (!category) {
            return productos
        }
        return productos.filter(producto => producto.category === category)
    }


    const classes = useStyles()
    useEffect(() => {
        axios('https://dummyjson.com/products')
            .then((response) => {
                setProductos(filterByCategory(response.data.products))
            })
    }, [category])

    return (
        <Grid
            container
            spacing={4}
            rowSpacing={4}
            className={classes.gridContainer}
            justify="center"
        >
            <ItemList productos={productos} />
        </Grid>
    )
}

export default ItemListContainer