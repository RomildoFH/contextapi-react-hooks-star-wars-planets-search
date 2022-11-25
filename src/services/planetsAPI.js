const planetsAPI = async () => {
  try {
    // console.log('iniciou fetch');
    const response = await fetch('https://swapi.dev/api/planets');
    const planetsData = await response.json();
    return planetsData;
  } catch (e) {
    // console.log(e.message);
    // alert('Desculpe, não foi possível se conectar ao servidor');
    // throw new Error('Desculpe, não foi possível se conectar ao servidor');
  }
};

export default planetsAPI;
