import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Producto = ({producto}) => {
    console.log(producto)
    return (
        <Card sx={{maxWidth: 345}}>
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
                    {producto.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Producto