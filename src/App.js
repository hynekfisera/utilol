import { useState } from "react";

function App() {
  const [host, setHost] = useState("eun1.api.riotgames.com");

  return (
    <div className="app">
      <header>
        <select
          value={host}
          onChange={(e) => {
            setHost(e.target.value);
          }}
        >
          <option value="br1.api.riotgames.com">BR1</option>
          <option value="eun1.api.riotgames.com">EUN1</option>
          <option value="euw1.api.riotgames.com">EUW1</option>
          <option value="jp1.api.riotgames.com">JP1</option>
          <option value="kr.api.riotgames.com">KR</option>
          <option value="la1.api.riotgames.com">LA1</option>
          <option value="la2.api.riotgames.com">LA2</option>
          <option value="na1.api.riotgames.com">NA1</option>
          <option value="oc1.api.riotgames.com">OC1</option>
          <option value="tr1.api.riotgames.com">TR1</option>
          <option value="	ru.api.riotgames.com">RU</option>
        </select>
      </header>
      {host}
    </div>
  );
}

export default App;
