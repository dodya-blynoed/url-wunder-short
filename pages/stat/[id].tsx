import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export default function Stat() {
    const {
        query: { id },
    } = useRouter()
    const getStatForItem = useCallback(async () => {
        const res = await axios.get(`/api/url/${id}`)
        return res.data
    }, [])
    useEffect(() => {
        getStatForItem()
            .then(console.log)
            .catch((e) => console.error)
    }, [])
    return <div>Stat for the last 7 days</div>
}
