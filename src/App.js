import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form.js';
import Form2 from './Form2.js';

function App() {

  const [stat, setStat] = useState('');
  const [playerid, setPlayerid] = useState(0);
  const [playerStat, setPlayerStat] = useState('');

  // useEffect(() => {
  //   // let url = new URL(playerID, 'https://statsapi.web.nhl.com/api/v1/people/')

  //   // const apiCall = 
  // }, [])
  // axios({
  //   url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}/stats/?stats=statsSingleSeason&season=20212022`,
  //   method: "GET",
  //   dataResponse: "json",
  //   // params: {
  //   //   client_id: "RzZKZv943CGW5DXPIS7EdD40wjy07mPj-YW_sLcbTJDE",
  //   //   query: "puppies",
  //   //   per_page: 30,
  //   // },

  // })
  //   .then((res) => {
  //     const playerStat = res.data.stats[0].splits[0].stat.goals

  //     console.log(playerStat)
  //     setStat(playerStat)
  //   });

  // async function getData() {
  //   const myObject = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerid}/stats/?stats=statsSingleSeason&season=20212022`);
  //   const parsedObject = await myObject.json();
  //   return parsedObject;
  // }
  // getData()
  //   .then((res) => {
  //     const playerStat = res.data.stats[0].splits[0].stat.goals

  //     console.log(playerStat)
  //     setStat(playerStat)
  //   });

  const getAnswer = (e, userPick) => {
    e.preventDefault();
    setPlayerid(userPick)
  }

  const getAnswer2 = (e, userPick) => {
    e.preventDefault();
    setPlayerStat(userPick)
  }

  const getStats = () => {
    // on get stats button push...
    // console.log(playerid + stat)
    axios({
      url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}/stats/?stats=statsSingleSeason&season=20212022`,
      method: "GET",
      dataResponse: "json",
    })
      .then((res) => {
        const playerStat = res.data.stats[0].splits[0].stat.goals
  
        console.log(playerStat)
        setStat(playerStat)
      });
  }

  // both forms send over data onChange
  // on button makes the api call with the correct information, and then resets the information variables to empty strings



  return (
    <div className="App">
      <h1>my hockey app</h1>
      {stat}
      <Form getAnswer={getAnswer} />
      <Form2 getAnswer2={getAnswer2}/>
      <button onClick={getStats}>Get those stats!</button>
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