import {API_KEY} from '../../modules/credentials.js'
const button = document.getElementById('button');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing a Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: API_KEY,
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log('Whoops', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
