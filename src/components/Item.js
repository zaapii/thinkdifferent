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
                height="140"
                image={producto.images[0]}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {producto.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {producto.description.substring(0,50) + '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <ItemCount onAdd={onAdd} nombre={producto.title} stock={producto.stock} initial="1" />
            </CardActions>
        </Card>
    )
}

export default Item