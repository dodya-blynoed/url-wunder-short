import { LinearProgress } from '@mui/material'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import UrlInput from '../components/url-input/url-input'
import UrlTable from '../components/url-table/url-table'
import styles from '../styles/Home.module.css'

export default function FrontPage() {
    const [urls, setUrls] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    console.log('shouldUpdate', shouldUpdate)
    const updateTableCallback = useCallback(async () => {
        const res = await axios.get('/api/all-urls')
        setShouldUpdate(false)
        return res
    }, [])
    useEffect(() => {
        updateTableCallback()
            .then((res) => {
                setUrls(res.data.entriesData)
                setIsFetching(false)
            })
            .catch((err) => {
                //handle error
                console.error(err)
            })
    }, [shouldUpdate])
    return (
        <div className={styles.container}>
            <Head>
                <title>Url Shortener</title>
                <meta name="description" content="Enshorten your url" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MuiThemeProvider>
                <main className={styles.main}>
                    <h3 className={styles.title}>Minimize any URL</h3>
                    <UrlInput initUpdate={() => setShouldUpdate(true)} />
                    {isFetching ? (
                        <LinearProgress />
                    ) : (
                        <UrlTable
                            urls={urls}
                            initUpdate={() => setShouldUpdate(true)}
                        />
                    )}
                </main>
            </MuiThemeProvider>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    )
}
