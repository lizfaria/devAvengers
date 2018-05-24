import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CryptoJS from "crypto-js";
import ComicResults from './ComicResults';
import SearchBar from './SearchBar';

const PUBLIC_KEY = "a7cf3b7902087aaf6031f05fab9fb738";
const PRIV_KEY = "442fd6fb50eb89717021a29e0c676e785f2687a5";
const ts = new Date().getTime();

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        search: '',
        comics: []
      }
        this.changeSearchState = this.changeSearchState.bind(this);
        this.searchComic = this.searchComic.bind(this);
    }

changeSearchState(value) {
  this.setState({
    search: value
  })
  console.log(value);
}

  searchComic() {
    // e.preventDefault();
    //API call for seach movies
    axios.get('http://gateway.marvel.com/v1/public/comics', {
      params: {
        ts: ts,
        apikey: "a7cf3b7902087aaf6031f05fab9fb738",
        hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
        titleStartsWith: this.state.search
      }
    })
      .then((res) => {
        console.log(res);

        this.setState({
          comics: res.data.data.results
        })
      })
  }

    render() {
      return <div>
          <SearchBar 
            changeSearchState={this.changeSearchState} 
            search={this.state.search} 
            searchComic={this.searchComic}/>
          <ComicResults 
            comics = {this.state.comics}
            search={this.state.search} />
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
