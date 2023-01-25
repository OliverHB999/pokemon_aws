import "./App.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [searchPoke, setsearchPoke] = useState(null);
  const [pokemons, setpokemons] = useState([]);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [loading3, setloading3] = useState(false);

  const [addRes, setaddRes] = useState("");

  const searchAction = () => {
    setloading(true);

    const name = document.querySelector("#search_in").value;
    let url2 = `https://kntqz3vgpivqtc4iekiykp7lee0bmruu.lambda-url.eu-west-1.on.aws/api/pokemon/${name}`;

    fetch(url2, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setsearchPoke(res))
      .finally(() => setloading(false));
  };

  const addAction = () => {
    setloading2(true);

    const name = document.querySelector("#add_in").value;
    let url2 = `https://kntqz3vgpivqtc4iekiykp7lee0bmruu.lambda-url.eu-west-1.on.aws/api/pokemon/postToS3/${name}/pokemons-223311`;

    fetch(url2, {
      method: "POST",
    })
      .then((res) => setaddRes(res))
      .finally(() => {
        setloading2(false);
      });
  };

  const loadAction = () => {
    setloading3(true);

    let url2 = `https://kntqz3vgpivqtc4iekiykp7lee0bmruu.lambda-url.eu-west-1.on.aws/api/pokemon/AllPokemons`;

    fetch(url2, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setpokemons(res))
      .finally(() => setloading3(false));
  };

  return (
    <div className="App">
      <h2> {">>THIS IS A DEMO<<"} This react app i pure frontend. It sends requests to aws Lambda function (REST API) </h2>
      <header className="App-header">
        <div className="search_div">
          <h3>search for a pokemon</h3>
          <input id="search_in" type="text" placeholder="name" />
          <button
            id="search_btn_in"
            onClick={() => {
              searchAction();
            }}
          >
            search
          </button>
          <ClipLoader loading={loading} color="green"></ClipLoader>
          {searchPoke > 0  ? (
            <div className="search_result">
              <h5 style={{ margin: 0 }}>{searchPoke.Name}</h5>
              <h6>type: {searchPoke.Type}</h6>{" "}
              <p style={{ fontWeight: 700 }}>Abilities:</p>
              {searchPoke.Abilities.map((ele) => {
                return <p key={ele}>{ele}</p>;
              })}
            </div>
          ) : (
            searchPoke === "not found" ? <p>no pokemon found</p> : ""
          )}
        </div>

        <div className="search_div">
          <h3>add a pokemon</h3>
          <input id="add_in" type="text" placeholder="name" />
          <button
            id="search_btn_in"
            onClick={() => {
              addAction();
            }}
          >
            add
          </button>
          <ClipLoader loading={loading2} color="green"></ClipLoader>
          {addRes.status === 200 ? (
            <p>pokemon added to S3</p>
          ) : (
            <p>
              {addRes.status ? addRes.status + ":something went wrong" : ""}
            </p>
          )}
        </div>

        <div className="search_div">
          <h3>your pokemons</h3>
          <button
            id="load_btn"
            onClick={() => {
              loadAction();
            }}
          >
            load
          </button>
          <ClipLoader loading={loading3} color="green"></ClipLoader>
          {pokemons.length > 0 ? (
            <div className="search_result">
              {pokemons.map((ele) => {
                return <p key={ele}>{ele}</p>;
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
