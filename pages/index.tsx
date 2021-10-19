import type { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import getCurrentHolder from '../api/getCurrentHolder';
import { HOCKEY_TEAMS } from '../constants/hockeyTeams';
import { Link } from '../components';

import { TEAM } from '../types';

type Props = {
  cupholder: TEAM;
} & NextPage;

const variants = {
  hidden: { opacity: 0, x: -500, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

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
      <motion.main
        className="grid justify-items-center content-center h-screen"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
      >
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 m-6 relative">
          <div>
            <dt className="text-2xl font-thin">Current cupholder</dt>
            <dd className="text-4xl font-light mb-10">{cupholder?.teamName}</dd>
            <dt className="text-2xl font-thin">Owner</dt>
            <dd className="text-4xl font-light">{hockeyteam?.owner}</dd>
          </div>
        </dl>
        <Link direction="right" href="/most" />
      </motion.main>
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
