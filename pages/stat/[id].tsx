import { LinearProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Bar } from '@nivo/bar'
import axios from 'axios'
import { data } from 'browserslist'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

import { UrlItem } from '../../types/url-type'
import { getFullShortedLink } from '../../utils/utils'

export default function Stat(props) {
    const {
        query: { id },
    } = useRouter()
    const [stat, setStat] = useState(undefined)
    console.log('props stat', props, id)
    const getStatForItem = async (id) => {
        console.log('before req id', id)
        const res = await axios.get(`/api/url/${id}`)
        console.log('after req ', res.data)

        return res.data
    }
    useEffect(() => {
        console.log('stat id', id)

        if (id)
            getStatForItem(id)
                .then((res) => setStat(res))
                .catch((e) => console.error)
    }, [id])

    console.log('data current', stat)
    if (!stat || !stat?.stat) return <LinearProgress />
    return (
        <>
            <Typography variant="h4" gutterBottom={true}>
                Stat for your link
            </Typography>
            {
                <Bar
                    width={600}
                    height={400}
                    margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
                    indexBy="date"
                    keys={['count']}
                    data={stat?.stat}
                />
            }
            <Typography>
                Original link: <b>{stat?.originalUrl?.length || 0}</b> symbols
            </Typography>
            <Typography>
                New link: <b>{getFullShortedLink(stat?.shortedUrl)?.length}</b>{' '}
                symbols
            </Typography>
        </>
    )
}
