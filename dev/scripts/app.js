import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ComicResults from './ComicResults';
import SearchBar from './SearchBar';








class App extends React.Component {
    render() {
      return (
        <div>
          <SearchBar />
          <ComicResults />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
