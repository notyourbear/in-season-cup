import fetchAPI from './fetchApi';

const getCurrentHolder = async function () {
  const data = await fetchAPI(
    `
    query CupHolder {
      cupholder {
        teamName
      }
    }`
  );

  return data.cupholder;
};

export default getCurrentHolder;
