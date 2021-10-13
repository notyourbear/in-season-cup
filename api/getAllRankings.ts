import fetchAPI from './fetchApi';

const getAllRankings = async function () {
  const data = await fetchAPI(
    `
    query AllRankings {
      allRankings {
        id
        teamName
        gamesHeld
      }
    }`
  );

  return data.allRankings;
};

export default getAllRankings;
