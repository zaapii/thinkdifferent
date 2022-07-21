import Grid from '@mui/material/Grid'
import Producto from "./Producto"
import axios from 'axios'
import {makeStyles} from "@mui/styles"
import {useEffect, useState} from "react"

const useStyles = makeStyles({
    gridContainer: {
        marginLeft: "70px",
        marginRight: "60px",
        marginTop: "60px"
    }
})
const ItemListContainer = () => {
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
            spacing={8}
            className={classes.gridContainer}
            justify="center"
        >
            {data.products.map(product => (
                <Producto key={product.id} producto={product} />
            ))}
        </Grid>
    )
}

export default ItemListContainer