import ItemDetail from './ItemDetail'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'

export default function ItemDetailContainer () {

    const {productId} = useParams()

    const [loading, setLoading] = useState(false)
    const [producto, setProducto] = useState({})

    async function getItem () {
        setLoading(true)
        const item = doc(db, "items", productId)

        getDoc(item).then((snapshot) => {
            if(snapshot.exists()) {
                setProducto({id: snapshot.id, ...snapshot.data()})
            }
        })
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        producto && <ItemDetail producto={producto} />
    )
}