const planetsAPI = async () => {
  try {
    // console.log('iniciou fetch');
    const response = await fetch('https://swapi.dev/api/planets');
    const planetsData = await response.json();
    // console.log('terminou fetch');
    // console.log(planetsData);
    return planetsData;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default planetsAPI;
