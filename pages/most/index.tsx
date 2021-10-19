import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getAllRankings from '../../api/getAllRankings';
import { motion } from 'framer-motion';
import { TEAM } from '../../types';

type Props = {
  longest: TEAM[];
} & NextPage;

const variants = {
  hidden: { opacity: 0, x: 500},
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const Home = ({ longest }: Props) => {
  return (
    <div>
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className="grid justify-items-center content-center h-screen bg-black text-white"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
      >
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 m-6">
          <div>
            <dt className="text-2xl font-thin">Longest holder of the cup</dt>
            <dd className="text-4xl font-light mb-10">
              {longest.map((team) => (
                <span key={team.teamName}>{team.teamName}</span>
              ))}
            </dd>
            <dt className="text-2xl font-thin">Games held</dt>
            <dd className="text-4xl font-light mb-10">
              {longest[0].gamesHeld}
            </dd>
          </div>
        </dl>
        <div className="absolute left-10 inset-y-3/4 sm:inset-y-1/2 text-3xl rounded-3xl bg-black">
          <Link href="/">&laquo;</Link>
        </div>
      </motion.main>
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
