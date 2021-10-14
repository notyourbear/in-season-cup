import type { NextPage } from 'next';
import Head from 'next/head';
import getAllData from '../api/getAllData';

type Props = {
  longest: any;
  cupholder: any;
} & NextPage;

const Home = ({ longest, cupholder }: Props) => {
  console.log({ longest, cupholder });
  return (
    <div>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>In-season stanley cup</h1>
        <dl>
          <dt>Current cupholder</dt>
          <dd>{cupholder.teamName}</dd>
          <dt>Longest holder of the cup</dt>
          <dd>
            {longest.map((team: any) => (
              <span key={team.teamName}>{team.teamName}</span>
            ))}
          </dd>
        </dl>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { allRankings, cupholder } = await getAllData();

  const longest = allRankings.reduce((acc: any[], currentTeam: any) => {
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
