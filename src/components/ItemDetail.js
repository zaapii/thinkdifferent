import Grid from '@mui/material/Grid'
import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useState, useContext } from "react"
import ItemCount from './ItemCount'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import { CartContext } from '../CartContext'
import { Image } from 'mui-image'
import { Box } from '@mui/system'
import { Card } from '@mui/material'

const ItemDetail = ({ producto, imagenes }) => {

    const { addToCart, cart } = useContext(CartContext)

    function onAdd(product) {
        addToCart(product, product.quantity)
    }

    const [imagenPrincipal, setImagenPrincipal] = useState()

    React.useEffect(() => {
        setImagenPrincipal(imagenes[0])
    }, [])
    

    return (
        <Grid container justifyContent="space-evenly">
            <Grid item md={2}>
                <ImageList sx={{ width: 120, height: 600, padding: 3 }} cols={1} rowHeight={120} gap={1}>
                    {imagenes?.map((img) => (
                        <ImageListItem key={img} onClick={() => setImagenPrincipal(img)}>
                            <Image src={`${img}`} height="100%" width="100%" fit="cover" duration={3000} easing="cubic-bezier(0.7, 0, 0.6, 1)" showLoading={false}
                                errorIcon={true}
                                distance="100px"
                                shiftDuration={900}
                                bgColor="inherit"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item md={6}>
                <h1>{producto.title}</h1>
                <Image src={imagenPrincipal} height="80%" width="100%" fit="contain" duration={3000} easing="cubic-bezier(0.7, 0, 0.6, 1)" showLoading={true}
                    errorIcon={true}
                    distance="100px"
                    shiftDuration={900}
                    bgColor="inherit"
                />
                <h3>{producto.description}</h3>
            </Grid>
            <Grid item md={2} sx={{ marginTop: 30 }}>
                {!cart.length && producto.stock > 0?
                    <Box sx={{ minWidth: 275 }}>
                        <Card sx={{padding: 2}}variant="outlined">
                            <h1 style={{marginLeft: 15}}>Precio: $ {producto.price}</h1>
                            <p style={{marginLeft: 33}}>{producto.stock} unidades disponibles</p>
                            <ItemCount onAdd={onAdd} producto={producto} initial="1" /> 
                        </Card>
                    </Box>
                    :
                    <Link style={{ textDecoration: 'none' }} to={`/cart`}>
                        {producto.stock > 0 ? <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="success" startIcon={<ShoppingCartCheckoutIcon />}>Finalizar Compra</Button> : <h3>SIN STOCK :(</h3>}
                    </Link>
                }
            </Grid>
        </Grid>
    )
}

export default ItemDetail