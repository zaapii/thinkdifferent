import Grid from '@mui/material/Grid'
import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import {useState} from "react"

const ItemDetail = ({producto}) => {
    const itemData = producto.images.map(image => {
        return {
            img: image
        }
    })
    const [imagenPrincipal, setImagenPrincipal] = useState(itemData[0].img)

    return (
        <Grid container justifyContent="space-evenly">
            <Grid item md={2}>
                <ImageList sx={{width: 120, height: 800, padding: 3}} cols={1} rowHeight={120}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} onClick={() => setImagenPrincipal(item.img)}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item md={6}>
                <h3>{producto.title}</h3>
                <img src={imagenPrincipal}></img>
            </Grid>
            <Grid item md={4} sx={{marginTop: 30}}>
                <h1>$ {producto.price}</h1>
            </Grid>
        </Grid>
    )
}

export default ItemDetail