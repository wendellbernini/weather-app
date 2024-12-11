import './styles/styles.css';

function checkForm() {
  const form = document.querySelector('#form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('#input');
    const metric = document.querySelector('#metric');
    const loading = document.querySelector('#loading');
    loading.textContent = 'loading...';
    try {
      await run(input.value, metric.value);
    } finally {
      loading.textContent = '';
    }
  });
}
const run = async function weatherData(local, metric) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${local}?unitGroup=metric&key=ES2L3XMKUVTFZA6T5T3MJJJ2L&contentType=json`
    );
    if (!response.ok) {
      throw new Error('Local não encontrado ou problema na API de clima.');
    }

    const json = await response.json();
    const obj = { regiao: local, temperature: null, icon: null };

    function validTemp(metric) {
      const temperature = json.days[0].temp;
      if (metric === 'celsius') {
        obj.temperature = temperature;
      } else {
        obj.temperature = temperature * 1.8 + 32;
      }
    }
    function validIcon() {
      obj.icon = json.days[0].icon;
    }

    async function apiGiphy(gif = 'cats') {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=UZP2kTG3lg5yC6KVi5uMPdrRVBvvuCl3&s=${gif}&weirdness=4`
      );
      if (!response.ok) {
        throw new Error('Problema ao carregar o GIF.');
      }
      const json = await response.json();
      console.log(json.data.images.downsized.url);
      console.log(obj.icon);
      return json.data.images.downsized.url;
    }

    async function dataDOM() {
      const localData = document.querySelector('#local-data');
      const temperaturaData = document.querySelector('#temperatura-data');
      const iconData = document.querySelector('#icon-data');
      const gifp = document.querySelector('#gif');
      localData.textContent = `Local: ${obj.regiao}`;
      temperaturaData.textContent = `Temperatura: ${Math.round(obj.temperature)}`;
      iconData.textContent = `Icone: ${obj.icon}`;
      gifp.src = await apiGiphy(obj.icon);
    }

    validTemp(metric);
    validIcon();
    await dataDOM();
  } catch (error) {
    console.log(error);
  }
};

checkForm();
