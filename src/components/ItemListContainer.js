import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import ItemList from './ItemList'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where, limit } from "firebase/firestore"
import LinearProgress from '@mui/material/LinearProgress';
import { db } from '../firebase'
import BackToIndexButton from "./BackToIndexButton"

const useStyles = makeStyles({
    gridContainer: {
        padding: 80
    }
})
const ItemListContainer = () => {

    const [loading, setLoading] = useState(false)
    const { category } = useParams()
    const [productos, setProductos] = useState([])

    const classes = useStyles()
    useEffect(() => {
        setLoading(true)
        // FILTERED PRODUCTS BY CATEGORY WHEN CATEGORY NOT NULL
        if (category) {
            const filtered = query(collection(db, "items"),
                where("category", "==", category),
                limit(20))

            getDocs(filtered).then((snapshot) => {
                setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
                setLoading(false)
            })
        } else {
            // ALL CATALOG WHEN CATEGORY IS NULL (COMING FROM '/')
            const allCatalog = query(collection(db, "items"),
                limit(20))
            getDocs(allCatalog).then((snapshot) => {
                setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
                setLoading(false)
            })
        }
    }, [category])

    return (
        <div>
            {loading && <LinearProgress color="error" />}
            <Grid
                container
                spacing={4}
                rowSpacing={4}
                className={classes.gridContainer}
                justify="center"
            >
                {productos.length > 0 ? <ItemList productos={productos} /> :
                    <div>
                        {!loading && <h1>{`No hay Productos en la categoría ${category} :(`}</h1>}
                        {!loading &&
                            <BackToIndexButton />
                        }
                    </div>}
            </Grid>
        </div>
    )
}

export default ItemListContainer