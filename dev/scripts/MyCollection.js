import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import CryptoJS from "crypto-js";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB0OyrwC2Tvi-SxHX3LGJm0Iw7xuJONaNY",
    authDomain: "devavengers-f4922.firebaseapp.com",
    databaseURL: "https://devavengers-f4922.firebaseio.com",
    projectId: "devavengers-f4922",
    storageBucket: "devavengers-f4922.appspot.com",
    messagingSenderId: "886807267915"
};
firebase.initializeApp(config);

// const PUBLIC_KEY = "a7cf3b7902087aaf6031f05fab9fb738";
// const PRIV_KEY = "442fd6fb50eb89717021a29e0c676e785f2687a5";
const PUBLIC_KEY = "aaacd28ae7e7c4de56a90d65adee65a8";
const PRIV_KEY = "8b0a41f0c34d95256e4336a09ed5d4e830173846";
const ts = new Date().getTime();

class MyCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      myCollection: [],
      comicCollection: [],
      seriesCollection: []
    };
  }

  //axios call that uses the comic ids from comicIds and stores in array called comicRequests(array of promises)
  getComic(id) {
    return axios.get(`http://gateway.marvel.com/v1/public/comics/${id}`, {
      params: {
        ts: ts,
        apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
        hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
        limit: 4
      }
    });
  }

  //axios call that uses the series ids from seriesIds and stores in array called seriesRequests(array of promises)
  getSeries(id) {
    return axios.get(`http://gateway.marvel.com/v1/public/series/${id}`, {
      params: {
        ts: ts,
        apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
        hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
        limit: 4
      }
    });
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("collection");
    dbRef.on("value", snapshot => {
      const comicData = snapshot.val();
      const myCollection = [];
      for (let item in comicData) {
        comicData[item].key = item;
        myCollection.push(comicData[item]);
      }
      
      this.setState({
        myCollection: myCollection
      })



      
      // console.log(myCollection);
      //put id of each comic into an array called comicIds
      const comicIds = myCollection
      .filter(item => item.id !== '')
      .map(item => {
        return item.id;
      });
      // console.log(comicIds)

    //put series ids into an array called seriesIds
      const seriesIds = myCollection
        .filter(item => item.series !== '')
        .map(item => {
        return item.series;
      });
      console.log(seriesIds)

      //Maps over comidIds array and passes each comic id into getComic function above
      const comicRequests = comicIds.map(id => {
        return this.getComic(id);
      });

      //Maps over seriesIds array and passes each series id into getSeries function above
      const seriesRequests = seriesIds.map(id => {
        return this.getSeries(id);
      });

      //When you get all results return from API call, store int an array called comicCollection or series Collection.
      //Then, map over it and return me the first result in the array. 
      Promise.all(comicRequests).then(results => {
        // console.log(results);
        const comicCollection = results.map(comic => {
          return comic.data.data.results[0];
        });
        this.setState({
          comicCollection: comicCollection
        });
      });

      Promise.all(seriesRequests).then(results => {
        // console.log(results);

        const seriesCollection = results.map(series => {
            return series.data.data.results[0];
        });
        console.log(seriesCollection);

        this.setState({
            seriesCollection: seriesCollection
        });
      });
    
    });  
  }

  //method to remove collection
  removeSeries(key) {
    firebase.database()
    .orderByChild('series')
    .equalTo(key)
    .once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        firebase.database().child(childSnapshot.key).remove();
      })
    })
    console.log(firebase.database()
    .orderByChild('series'));
    
    

    // console.log(firebase.database().ref(`collection/${key}`));
  }
//go to firebase database
// find all children of collection
// find any grandchild of collection whose value matches the series id or issue id
// child, parent methods

  render() {
    return (
      <div>
        <div>
          <p>comic</p>
          {this.state.comicCollection.map((item, i) => {
            return (
              <div key={i}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
                <p>{item.title}</p>
                {/* <button onClick={() => this.removeCollection(item.id)}>X</button> */}
              
              </div>
            );
          })}
        </div>

        <div>
          <p>series</p>
          {this.state.seriesCollection.map((item, i) => {
            return (
              <div key={i}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
                <p>{item.title}</p>
                <button onClick={() => this.removeSeries(item.id)}>X</button> 
                
              </div>
            );
          })}
        </div>
    </div>
    );
  }
}

export default MyCollection; 