import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Table} from "material-ui";

export default function Home() {
    const [urls, setUrls] = useState({
        id: 1,
        orginal: 'fb.com/test',
        enshortned: 'bit.ly/test'
    });
  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shortner</title>
        <meta name="description" content="Enshorten your url" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>
<Table>

</Table>
      </main>

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
