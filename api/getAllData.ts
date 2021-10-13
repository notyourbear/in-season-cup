import fetchAPI from './fetchApi';

const getAllData = async function () {
  const data = await fetchAPI(
    `
    query AllData {
      allRankings {
        id
        teamName
        gamesHeld
      }
      cupholder {
        teamName
      }
    }`
  );

  return data;
};

export default getAllData;
