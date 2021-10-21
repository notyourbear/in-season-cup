import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import getAllRankings from '../../api/getAllRankings';

import type { NextPage } from 'next';
import { TEAM } from '../../types';
import { getTeamOwner } from '../../utils';


type Props = {
  longest: TEAM[];
} & NextPage;

const variants = {
  hidden: { opacity: 0, x: 500, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const Home = ({ longest }: Props) => {
  return (
    <div className="absolute inset-0">
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className="grid justify-items-center content-center h-full bg-black text-white"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
      >
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 m-6 relative">
          <div>
            <dt className="text-2xl font-thin">Longest holder of the cup</dt>
            <dd className="text-4xl font-light mb-10">
              {longest.map((team) => (
                <React.Fragment key={team.teamName}>
                  <span key={team.teamName}>{team.teamName}</span>
                  <span className="text-2xl font-light ml-5">
                    (owner: {getTeamOwner(team)})
                  </span>
                </React.Fragment>
              ))}
            </dd>
            <dt className="text-2xl font-thin">Games held</dt>
            <dd className="text-4xl font-light mb-10">
              {longest[0].gamesHeld}
            </dd>
          </div>
        </dl>
        <Link href="/" passHref>
          <div
            className="absolute left-10 bottom-1/4 sm:bottom-1/2 text-4xl hover:text-red-500 cursor-pointer"
            aria-label="link"
          >
            <svg
              className="fill-current"
              aria-hidden="true"
              viewBox="0 0 320 512"
              width="50"
              height="50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34.52 239.03 228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
            </svg>
          </div>
        </Link>
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
