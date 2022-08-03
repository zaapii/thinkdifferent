import ItemDetail from './ItemDetail'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function ItemDetailContainer () {

    const {productId} = useParams()

    const [loading, setLoading] = useState(false)
    const [producto, setProducto] = useState({})

    async function getItem () {
        setLoading(true)
        await axios(`https://dummyjson.com/products/${productId}`)
            .then((response) => {
                setProducto(response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        producto && <ItemDetail producto={producto} />
    )
}