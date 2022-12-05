import { useState } from 'react';
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
    // checks to see if a stat has been chosen
    if (playerStat){
      axios({
        // looks in state and changes the value in the template-literal URL to the correct player's ID. a sneaky way to get around params, which this API seemingly doesn't document
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
  }

  // object that keeps track of the correct images
  const imagesPath = {
    0: {
      img: "../assets/nhlLogo.png",
      alt: "nhl logo"
    },
    8478402: {
      img: "../assets/mcdavid.jpg",
      alt: "picture of Connor McDavid"
    },
    8479318: {
      img: "../assets/matthews.jpg",
      alt: "picture of Auston Matthews"
    },
    8477934: {
      img: "../assets/draisaitl.jpg",
      alt: "picture of Leon Draisaitl"
    },
    8471675: {
      img: "../assets/crosby.jpg",
      alt: "picture of Sidney Crosby"
    },
    8471214: {
      img: "../assets/ovechkin.jpg",
      alt: "picture of Alex Ovechkin"
    }
  }

  return (
    <div className="App">
      <section className="textSec">
        <h1>Hockey Compare</h1>
        <h3>Definietly not the only way to get stats</h3>
        <p>The 2022-2023 NHL season was one of the highest scoring seasons of the modern age.</p>
        <p>Choose one of your favourite hockey players (or the most popular) and then pick a cool stat.</p>     
      </section>
      <section className='userInputSec'>
        <Form getAnswer={getAnswer} />
        <button onClick={getStats}>Get those stats!</button>
        <Form2 getAnswer2={getAnswer2} />
      </section>
      <section className='displaySec'>
        <div className="imgCon">
          <img src={imagesPath[playerid].img} alt={imagesPath[playerid].alt} />
        </div>
        <div className="statCon">
          <p className='statP'>{stat}</p>
        </div>
      </section>
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