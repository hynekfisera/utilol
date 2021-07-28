import { useState } from "react";
const fetch = require("node-fetch");

function App() {
  const key = "?api_key=RGAPI-c0b8fb05-ed80-41d0-ae11-fb8a9aa6fbdd";

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

  function getServerInfo(name) {
    return servers.find((server) => (server.name = name));
  }

  async function getSummonerInfo(name) {
    const link = "https://" + getServerInfo(server).host + "/lol/summoner/v4/summoners/by-name/" + name + key;
    const response = await fetch(link);
    console.log(response.json());
  }

  async function getMaxDeaths() {
    console.log(getSummonerInfo(inputValue));
  }

  return (
    <div className="app">
      <header>
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
      </header>
      <input type="text" placeholder="Summoner name" value={inputValue} onInput={(e) => setInputValue(e.target.value)} />
      <button onClick={getMaxDeaths}>Submit</button>
    </div>
  );
}

export default App;
