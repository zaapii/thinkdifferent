import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ItemCount from './ItemCount'
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {CartContext} from '../CartContext'
import { useContext } from 'react'

const Item = ({ producto }) => {

    const { addToCart } = useContext(CartContext)

    // ADD PRODUCT TO CARD
    function onAdd(product) {
        addToCart(product, product.quantity)
    }
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={producto.images[0]}
                sx={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                    {producto.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {producto.description.substring(0, 50) + '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container sx={{ alignItems: "center" }}>
                    { producto.stock > 0 ?
                    <Grid item>
                        <ItemCount onAdd={onAdd} producto={producto} initial="1" />
                    </Grid>
                    : <h3>SIN STOCK :(</h3> } 
                    <Grid item md={12} sx={{marginTop: 1}}>
                        <Link style={{ textDecoration: 'none' }} to={`/item/${producto.id}`}>
                            <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="error" startIcon={<PreviewIcon />}>Ver Detalle</Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default Item