import Head from 'next/head';
import Link from 'next/link';

import getCurrentHolder from '../api/getCurrentHolder';
import { getTeamOwner } from '../utils';

import type { NextPage } from 'next';
import { TEAM } from '../types';

type Props = {
  cupholder: TEAM;
} & NextPage;

const Home = ({ cupholder }: Props) => {
  const owner = getTeamOwner(cupholder);

  return (
    <div className="absolute inset-0">
      <Head>
        <title>Eighty two wins</title>
        <meta name="description" content="an in-season stanely cup site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="grid justify-items-center content-center h-full bg-white text-black"
      >
        <h1 className="hidden">In-season stanley cup</h1>
        <dl className="grid grid-cols-1 m-6 relative">
          <div>
            <dt className="text-2xl font-thin">Current cupholder</dt>
            <dd className="text-4xl font-light mb-10">{cupholder?.teamName}</dd>
            <dt className="text-2xl font-thin">Owner</dt>
            <dd className="text-4xl font-light">{owner}</dd>
          </div>
        </dl>
        <Link href="/most" passHref>
          <div
            className="absolute right-10 bottom-1/4 sm:bottom-1/2 text-4xl hover:text-red-500 cursor-pointer transform rotate-180"
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
  const cupholder = await getCurrentHolder();

  return {
    props: { cupholder },
  };
}

export default Home;
