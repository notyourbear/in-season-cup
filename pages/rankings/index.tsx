import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getAllRankings from '../../api/getAllRankings';
import { TEAM } from '../../types';

type Props = {
  longest: TEAM[];
} & NextPage;

const Home = ({ longest }: Props) => {
  return (
    <div>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="hidden">In-season stanley cup</h1>
        <div>will hold all of the team rankings</div>
        <Link href="/most">prev</Link>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const allRankings = await getAllRankings();

  const longest = allRankings.reduce((acc: TEAM[], currentTeam: TEAM) => {
    if (!acc.length) {
      return [currentTeam];
    }

    const opt = acc[0];
    if (opt.gamesHeld < currentTeam.gamesHeld) {
      return [currentTeam];
    } else if (opt.gamesHeld > currentTeam.gamesHeld) {
      return acc;
    } else {
      return acc.concat(currentTeam);
    }
  }, []);

  return {
    props: { longest },
  };
}

export default Home;
