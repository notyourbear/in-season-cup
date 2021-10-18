import type { NextPage } from 'next';
import Head from 'next/head';
import getAllData from '../../api/getAllData';
import { TEAM } from '../../types';

type Props = {
  longest: TEAM[];
  cupholder: TEAM;
} & NextPage;

const Home = ({ longest, cupholder }: Props) => {
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
            <dt>Longest holder of the cup</dt>
            <dd>
              {longest.map((team) => (
                <span key={team.teamName}>{team.teamName}</span>
              ))}
            </dd>
          </div>
        </dl>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { allRankings, cupholder } = await getAllData();

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
    props: { cupholder, longest },
  };
}

export default Home;
