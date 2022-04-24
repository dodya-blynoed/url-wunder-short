import Head from 'next/head'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import styles from '../styles/Home.module.css'
import UrlTable from "../components/url-table/url-table";
import {useState} from "react";
import {UrlItem} from "../types/url-type";
import {isUrlValid} from "../utils/utils";

const item: UrlItem = {
    id: 'ttt',
    originalUrl: 'fb.com/test',
    shortedUrl: 'bit.ly/test',
    views: 4,
}

export default function Home() {
    const [urls] = useState([item]);
    const handleOnChange = (ev) => {
        const { value } = ev.target;
        // validate url
        if (!isUrlValid(value)) return;
    };
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
          <TextField
              id="standard-helperText"
              label="https://example.com"
              variant="standard"
              onBlur={ handleOnChange }
          />
        <UrlTable urls={ urls }/>
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
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
