import type { NextPage } from 'next';
import Head from 'next/head';
import getCurrentHolder from '../api/getCurrentHolder';
import { TEAM } from '../types';

type Props = {
  cupholder: TEAM;
} & NextPage;

const Home = ({ cupholder }: Props) => {
  return (
    <div>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
          <div>
            <dt>Current cupholder</dt>
            <dd>{cupholder.teamName}</dd>
          </div>
        </dl>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const cupholder = await getCurrentHolder();

  return {
    props: { cupholder },
  };
}

export default Home;
