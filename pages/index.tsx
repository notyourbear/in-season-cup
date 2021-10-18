import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getCurrentHolder from '../api/getCurrentHolder';
import { HOCKEY_TEAMS } from '../constants/hockeyTeams';
import { TEAM } from '../types';

type Props = {
  cupholder: TEAM;
} & NextPage;

const Home = ({ cupholder }: Props) => {
  const hockeyteam = Object.values(HOCKEY_TEAMS).find(
    ({ teamName }) => teamName === cupholder?.teamName
  );

  return (
    <div>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 m-6">
          <div>
            <dt className="text-2xl font-thin">Current cupholder</dt>
            <dd className="text-4xl font-light mb-10">{cupholder?.teamName}</dd>
            <dt className="text-2xl font-thin">Owner</dt>
            <dd className="text-4xl font-light">{hockeyteam?.owner}</dd>
          </div>
        </dl>
        <Link href="/most">next</Link>
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
