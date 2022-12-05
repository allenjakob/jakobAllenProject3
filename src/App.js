import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form.js';
import Form2 from './Form2.js';

function App() {

  // setting state for important variables, including one from each form component
  const [stat, setStat] = useState('#?');
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
    },
    8474600: {
      img: "../assets/josi.jpg",
      alt: "picture of Roman Josi"
    },
    8478483: {
      img: "../assets/marner.jpg",
      alt: "picture of Mitch Marner"
    },
    8474564: {
      img: "../assets/stamkos.jpg",
      alt: "picture of Steven Stamkos"
    },
    8474141: {
      img: "../assets/kane.jpg",
      alt: "picture of Patrick Kane"
    },
    8473419: {
      img: "../assets/marchand.jpg",
      alt: "picture of Brad Marchand"
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <section className="textSec">
          <h1>Hockey Compare</h1>
          <h3>Definietly not the only way to get stats</h3>
          <p>The 2022-2023 NHL season was one of the highest scoring seasons of the modern age.</p>
          <p>Choose one of your favourite hockey players (or the most popular) and then pick a cool stat. Now all you have to do is Get Those Stats!</p>
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
        <footer>
          <p>Made at Juno 2022 | By Jakob Allen</p>
        </footer>

      </div>
    </div>
  );
}

export default App;


// pseudocode!
// a form box where you can pick between 5-10 popular hockey players
// pick from another form to determine which stat you want to display from said player
// make an api call with that players ID to return which stat the user selected
// display that stat on the screen

// stretch goals
// add a picture of the player

// even stretchier
// pick two players at once
