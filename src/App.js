import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form.js';
import Form2 from './Form2.js';

function App() {

  // setting state for important variables, including one from each form component
  const [stat, setStat] = useState('');
  const [playerid, setPlayerid] = useState(0);
  const [playerStat, setPlayerStat] = useState('');

  // gets the hockey player choice data from the first form
  const getAnswer = (e, userPick) => {
    e.preventDefault();
    setPlayerid(userPick)
  }

  // gets the chosen stat data from the second form
  const getAnswer2 = (e, userPick) => {
    e.preventDefault();
    setPlayerStat(userPick)
  }

  // on get stats button push... make the api call and set the value in state
  const getStats = () => {
    axios({
      url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}/stats/?stats=statsSingleSeason&season=20212022`,
      method: "GET",
      dataResponse: "json",
    }).then((res) => {
        // checks to see what 'playerStat' is set at to choose which api information to save to the variable
        const apiData =
        playerStat === 'goals' ? res.data.stats[0].splits[0].stat.goals 
        : playerStat === 'assists' ? res.data.stats[0].splits[0].stat.assists
        : playerStat === 'points' ? res.data.stats[0].splits[0].stat.points
        : playerStat === 'hits' ? res.data.stats[0].splits[0].stat.hits
        : res.data.stats[0].splits[0].stat.pim 
        // setState
        setStat(apiData)
      });
  }

  // keeps track of the image paths for referencing
  const imagesPath = {
    0: "./assets/nhlLogo.png",
    8478402: "./assets/mcdavid.jpg",
    8479318: "./assets/matthews.jpg",
    8477934: "./assets/draisaitl.jpg",
    8471675: "./assets/crosby.jpg",
    8471214: "./assets/ovechkin.jpg"
  }

  return (
    <div className="App">
      <h1>my hockey app</h1>
      <Form getAnswer={getAnswer}/>
      <Form2 getAnswer2={getAnswer2}/>
      <button onClick={getStats}>Get those stats!</button>
      <img src={imagesPath[playerid]} alt="" />
      <p className='statP'>{stat}</p>
    </div>
  );
}

export default App;


// pseudocode!
// a form box where you can pick between 5-10 popular hockey players
// display a picture of them
// pick from another form to determine which stat you want to display from said player
// make an api call with that players ID to return which stat the user selected
// display that stat on the screen

// stretch goals
// instead of picking one hockey player, the user can select two at the same time
// compare both players stats and change the styling based on the better stats

// even stretchier
// after both players are picked, a random stat is chosen
// the user must select which player had the higher stat
// pick another random stat and repeat












// const url = new URL('https://www.rijksmuseum.nl/api/en/collection')
//     // search params
//     url.search = new URLSearchParams({
//         // we have our key, asking for only images, and the querey is monkey
//         key: artApp.key,
//         imgonly: true,
//         q: query
//     })