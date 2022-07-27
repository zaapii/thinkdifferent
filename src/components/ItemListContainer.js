import axios from 'axios'
import {makeStyles} from "@mui/styles"
import {useEffect, useState} from "react"
import ItemList from './ItemList'
import Grid from '@mui/material/Grid'


const useStyles = makeStyles({
    gridContainer: {
        padding: 80
    }
})
const ItemListContainer = ({displayBadge}) => {
    function addItemToCart(value) {
        displayBadge(value)
    }
    const [data, setData] = useState({products: []})
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://dummyjson.com/products',
            )
            setData(result.data)
        }

        fetchData()
    }, [])

    return (
        <Grid
            container
            spacing={4}
            rowSpacing={4}
            className={classes.gridContainer}
            justify="center"
        >
            <ItemList productos={data.products} displayBadge={addItemToCart} />
        </Grid>
    )
}

export default ItemListContainer