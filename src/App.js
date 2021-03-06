import { useState } from "react";
const fetch = require("node-fetch");

function App() {
  const key = "api_key=" + process.env.REACT_APP_RIOT;
  const cors = process.env.REACT_APP_CORS;

  const servers = [
    {
      name: "BR1",
      host: "br1.api.riotgames.com",
      routing: "americas.api.riotgames.com",
    },
    {
      name: "EUN1",
      host: "eun1.api.riotgames.com",
      routing: "europe.api.riotgames.com",
    },
    {
      name: "EUW1",
      host: "euw1.api.riotgames.com",
      routing: "europe.api.riotgames.com",
    },
    {
      name: "JP1",
      host: "jp1.api.riotgames.com",
      routing: "asia.api.riotgames.com",
    },
    {
      name: "KR",
      host: "kr.api.riotgames.com",
      routing: "asia.api.riotgames.com",
    },
    {
      name: "LA1",
      host: "la1.api.riotgames.com",
      routing: "americas.api.riotgames.com",
    },
    {
      name: "LA2",
      host: "la2.api.riotgames.com",
      routing: "americas.api.riotgames.com",
    },
    {
      name: "NA1",
      host: "na1.api.riotgames.com",
      routing: "americas.api.riotgames.com",
    },
    {
      name: "OC1",
      host: "oc1.api.riotgames.com",
      routing: "americas.api.riotgames.com",
    },
    {
      name: "TR1",
      host: "tr1.api.riotgames.com",
      routing: "europe.api.riotgames.com",
    },
    {
      name: "RU",
      host: "ru.api.riotgames.com",
      routing: "europe.api.riotgames.com",
    },
  ];

  const [server, setServer] = useState("EUN1");

  const [inputValue, setInputValue] = useState("");

  const [resultText, setResultText] = useState("");

  const [progress, setProgress] = useState(0);

  function getServerInfo(name) {
    return servers.find((server) => server.name === name);
  }

  async function getSummonerInfo(name) {
    const link = "https://" + getServerInfo(server).host + "/lol/summoner/v4/summoners/by-name/" + name + "?" + key;
    return fetch(cors + link).then((response) => {
      return response.json();
    });
  }

  async function getMatches(puuid) {
    const link = "https://" + getServerInfo(server).routing + "/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=50&" + key;
    return fetch(cors + link).then((response) => {
      return response.json();
    });
  }

  async function getSingleMatch(id) {
    const link = "https://" + getServerInfo(server).routing + "/lol/match/v5/matches/" + id + "?" + key;
    return fetch(cors + link).then((response) => {
      return response.json();
    });
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getMaxDeaths(name) {
    const summoner = await getSummonerInfo(name);
    const matches = await getMatches(summoner.puuid);
    let maxDeaths = 0;

    for (const match of matches) {
      const info = await getSingleMatch(match);
      const deaths = info.info.participants.find((player) => player.puuid === summoner.puuid).deaths;
      if (deaths > maxDeaths) {
        maxDeaths = deaths;
      }
      setProgress((progress) => progress + 1);
      await sleep(500);
    }
    return maxDeaths;
  }

  async function onSubmit() {
    setProgress(0);
    const result = await getMaxDeaths(inputValue);
    setResultText(`${inputValue} has reached max count of ${result} deaths in the last 50 games!`);
  }

  return (
    <div className="app">
      <div>
        <select
          value={server}
          onChange={(e) => {
            setServer(e.target.value);
          }}
        >
          {servers.map((server) => {
            return (
              <option value={server.name} key={server.name}>
                {server.name}
              </option>
            );
          })}
        </select>
        <input type="text" placeholder="Summoner name" value={inputValue} onInput={(e) => setInputValue(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <progress value={progress} max="50">
        {progress}
      </progress>
      <span>{resultText}</span>
    </div>
  );
}

export default App;
