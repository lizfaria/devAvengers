import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
  } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import CryptoJS from "crypto-js";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB0OyrwC2Tvi-SxHX3LGJm0Iw7xuJONaNY",
  authDomain: "devavengers-f4922.firebaseapp.com",
  databaseURL: "https://devavengers-f4922.firebaseio.com",
  projectId: "devavengers-f4922",
  storageBucket: "devavengers-f4922.appspot.com",
  messagingSenderId: "886807267915"
};
firebase.initializeApp(config);

//Alernate keys
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
      seriesCollection: [],
      userId: ""
    };
  }

  //axios call that uses the comic ids from comicIds and stores in array called comicRequests(array of promises)
  getComic(id) {
    return axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
      params: {
        ts: ts,
        apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
        hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
      }
    });
  }

  //axios call that uses the series ids from seriesIds and stores in array called seriesRequests(array of promises)
  getSeries(id) {
    return axios.get(`https://gateway.marvel.com/v1/public/series/${id}`, {
      params: {
        ts: ts,
        apikey: "aaacd28ae7e7c4de56a90d65adee65a8",
        hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
      }
    });
  }

  //Show collection only if user is signed in, otherwise ask user to sign in
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        const dbRef = firebase.database().ref(`collection/${user.uid}`);

        //Show snapshot of firebase, push key into myCollection
        dbRef.on("value", snapshot => {
          const comicData = snapshot.val();
          const myCollection = [];
          for (let item in comicData) {
            comicData[item].key = item;
            myCollection.push(comicData[item]);
          }

          this.setState({
            myCollection: myCollection,
            userId: user.uid
          })

          const comicIds = myCollection
          //filter for ones with information (not empty strings)
          .filter(item => item.id !== "")
          //put id of each comic into an array called comicIds
            .map(item => {
              return {
                key: item.key,
                id: item.id
              }
            });

            const seriesIds = myCollection
            //filter for ones with information (not empty strings)
            .filter(item => item.series !== "")
            //put series ids into an array called seriesIds
            .map(item => {
              return {
                key: item.key,
                id: item.series
              }
            });

          //Maps over comidIds array and passes each comic id into getComic function above
          const comicRequests = comicIds.map(item => {
            return this.getComic(item.id);
          });

          //Maps over seriesIds array and passes each series id into getSeries function above
          const seriesRequests = seriesIds.map(item => {
            return this.getSeries(item.id);
          });

          //When all results return from API call, store into an array called comicCollection or seriesCollection.
          //Then, map over it and return me the first result in the array. 
          Promise.all(comicRequests).then(results => {
            const comicCollection = results.map(comic => {
              return comic.data.data.results[0];
            })
              .map((comic, i) => {
                comic.key = comicIds[i].key
                return comic
              })
            this.setState({
              comicCollection: comicCollection
            });
          });
          Promise.all(seriesRequests).then(results => {
            const seriesCollection = results.map(series => {
              return series.data.data.results[0];
            })
              .map((series, i) => {
                series.key = seriesIds[i].key
                return series
              })
            this.setState({
              seriesCollection: seriesCollection
            });
          });
        });
      } else alert("Please sign in.")
    })
  }

  //method to remove collection item from a specific authenticated users collection
  removeItem(key) {
    firebase.database().ref(`collection/${this.state.userId}/${key}`).remove()
  }

  render() {
    return (
      <div className="myCollection">
      <div className="wrapper">
        <div className="clearfix">
        <h6>Your Comics:</h6>
          {this.state.comicCollection.map((item, i) => {
            return (
              <div key={i} className="collectionComicContainer">
                <a href={item.urls[0].url} target="_blank">
                <img src={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`} alt=""/>
                </a>
                <p className="comicTitle">{item.title}</p>
                <button onClick={() => this.removeItem(item.key)} className="removeButton">Remove From Collection</button>
              </div>
            );
          })}
        </div>
        <div className="clearfix">
        <h6>Your Series:</h6>
          {this.state.seriesCollection.map((item, i) => {
            return (
              <div key={i} className="collectionComicContainer">
                <a href={item.urls[0].url} target="_blank">
                <img src={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`} alt="" />
                </a>
                <p className="comicTitle">{item.title}</p>
                <button onClick={() => this.removeItem(item.key)} className="removeButton">Remove From Collection</button>
              </div>
            );
          })}
        </div>
      </div>  
      </div>
    );
  }
}
export default MyCollection; 