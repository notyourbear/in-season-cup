import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import getAllRankings from '../../api/getAllRankings';

import type { NextPage } from 'next';
import { TEAM } from '../../types';
import { getTeamOwner } from '../../utils';
import { OWNERS } from '../../constants/owners';

type Props = {
  rankings: any[];
} & NextPage;

const Rankings = ({ rankings }: Props) => {
  return (
    <div className="absolute inset-0">
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid justify-items-center content-center h-full bg-sunset-3 text-white">
        <h1 className="hidden">In-season stanley cup</h1>
        <div className="grid grid-cols-1 m-6 relative">
          <h2 className="text-2xl font-medium m-6">Rankings</h2>
          <ol className="list-decimal">
            {rankings.map((ranking) => (
              <li className="mb-3 font-medium text-xl" key={ranking[0]}>{ranking[0]}: {ranking[1].teamName} ({ranking[1].gamesHeld} wins)</li>
            ))}
            <li className="mb-3 font-medium text-xl">The rest of the scrubs with 0 wins</li>
          </ol>
        </div>
        <Link href="/most" passHref>
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
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const allRankings = await getAllRankings();

  const teamsByOwner = allRankings.reduce(
    (acc: Record<OWNERS, TEAM>, currentTeam: TEAM) => {
      const owner = getTeamOwner(currentTeam);
      if (!owner) {
        return acc;
      }
      if (!acc[owner]) {
        acc[owner] = currentTeam;
      } else {
        acc[owner] =
          currentTeam.gamesHeld > acc[owner].gamesHeld
            ? currentTeam
            : acc[owner];
      }
      return acc;
    },
    {}
  );

  const rankings = Object.entries(teamsByOwner).sort((a, b) =>
    a[1].gamesHeld > b[1].gamesHeld ? -1 : 1
  );

  console.log({ rankings });

  return {
    props: { rankings },
  };
}

export default Rankings;
