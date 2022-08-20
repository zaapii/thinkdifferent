import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import ItemList from './ItemList'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { getDocs, collection, getFirestore, query, where, limit } from "firebase/firestore"
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@mui/material/LinearProgress';
import { db } from '../firebase'

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
        // Filtered Products by category
        if (category) {
            const filtered = query(collection(db, "items"),
                where("category", "==", category),
                limit(20))

            getDocs(filtered).then((snapshot) => {
                setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
                setLoading(false)
            })
        } else {
            // All catalog
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
                            <NavLink style={{ textDecoration: 'none' }} to={`/`}>
                                <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="error" startIcon={<ArrowBackIcon />}>
                                    Volver al Índice
                                </Button>
                            </NavLink>
                        }
                    </div>}
            </Grid>
        </div>
    )
}

export default ItemListContainer