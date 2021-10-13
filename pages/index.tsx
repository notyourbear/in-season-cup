import type { NextPage } from 'next';
import Head from 'next/head';
import getAllData from '../api/getAllData';
import styles from '../styles/Home.module.css';

type Props = {
  allRankings: any;
  cupholder: any;
} & NextPage;

const Home = ({ allRankings, cupholder }: Props) => {
  console.log({ allRankings, cupholder });
  return (
    <div className={styles.container}>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Cupholder: {cupholder.teamName}</h1>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { allRankings, cupholder } = await getAllData();

  return {
    props: { allRankings, cupholder }, // will be passed to the page component as props
  };
}

export default Home;
