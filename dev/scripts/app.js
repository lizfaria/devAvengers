import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route, 
  Link
} from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import Header from "./Header";
import Footer from "./Footer"
import ComicResults from "./ComicResults";
import SearchBar from "./SearchBar";
import MyCollection from "./MyCollection";
import firebase from "firebase";

//Two keys in case of going over request limit
// const PUBLIC_KEY = "a7cf3b7902087aaf6031f05fab9fb738";
// const PRIV_KEY = "442fd6fb50eb89717021a29e0c676e785f2687a5";
const PUBLIC_KEY = "aaacd28ae7e7c4de56a90d65adee65a8";
const PRIV_KEY = "8b0a41f0c34d95256e4336a09ed5d4e830173846";
const ts = new Date().getTime();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      comics: [],
      characterId: "",
      
    };
    this.changeSearchState = this.changeSearchState.bind(this);
    this.searchByComic = this.searchByComic.bind(this);
    this.searchByCharacter = this.searchByCharacter.bind(this);
  }

  changeSearchState(value) {
    this.setState({
      search: value
    });
  }

  searchByComic() {
    //API call for seach by comic
    axios
      .get("http://gateway.marvel.com/v1/public/comics", {
        params: {
          ts: ts,
          apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
          hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
          titleStartsWith: this.state.search,
          limit: 12
        }
      })
      .then(res => {
        this.setState({
          comics: res.data.data.results
        });
      });
  }

  searchByCharacter() {
    //API call for seach by character
    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        params: {
          ts: ts,
          apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
          hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
          name: this.state.search,
          limit: 12
        }
      })
      .then(res => {
        res.data.data.results.map((result) =>{
          this.setState({
            characterId: result.id
          }) 
        })
        axios.get(`http://gateway.marvel.com/v1/public/characters/${this.state.characterId}/comics`, {
        params: {
          ts: ts,
          apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
          hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
          limit: 12
        }
        }).then(res => {
          this.setState({
            comics: res.data.data.results
          })
        })
      })
    }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route 
            exact path="/" 
            render={(props) => <SearchBar {...props}          
            changeSearchState={this.changeSearchState}
            search={this.state.search}
            searchByComic={this.searchByComic}
            searchByCharacter={this.searchByCharacter}/>} 
          />
          
          <Route 
            path="/ComicResults" 
            render={(props) => <ComicResults {...props} 
            comics={this.state.comics} 
            search={this.state.search} />} 
          />

          <Route path="/MyCollection" component={MyCollection} /> 

          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
