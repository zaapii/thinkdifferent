import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ItemCount from './ItemCount'


const Item = ({producto, addItemToCart, itemDetail}) => {
    function onAdd(value) {
        addItemToCart(value)
    }
    return (
        <Card sx={{maxWidth: 345}} onClick={() => itemDetail(producto)}>
            <CardMedia
                component="img"
                height="200"
                image={producto.images[0]}
                sx={{ objectFit: "contain" }}
            />
            <CardContent>
                <Typography variant="h5" sx={{marginBottom:1}}>
                    {producto.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {producto.description.substring(0,50) + '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <ItemCount onAdd={onAdd} nombre={producto.title} id={producto.id} stock={producto.stock} initial="1" />
            </CardActions>
        </Card>
    )
}

export default Item