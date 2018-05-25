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

const PUBLIC_KEY = "a7cf3b7902087aaf6031f05fab9fb738";
const PRIV_KEY = "442fd6fb50eb89717021a29e0c676e785f2687a5";
const ts = new Date().getTime();


class MyCollection extends React.Component {
    constructor(){
        super();
        this.state = {
            collection : []
        }
    }

    //axios call that uses the comic ids from comicIds and stores in array called comicRequests(array of promises)
    getComic(id) {
        return axios
            .get(`http://gateway.marvel.com/v1/public/comics/${id}`, {
                params: {
                    ts: ts,
                    apikey: "a7cf3b7902087aaf6031f05fab9fb738",
                    hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
                  
                }
            })
                
    }

    componentDidMount () {
        const dbRef = firebase.database().ref('collection');
        dbRef.on('value', snapshot => {
            const comicData = snapshot.val();
            const myCollection = [];
            // console.log(comicData)
            for (let item in comicData) {
                // console.log(item);
                comicData[item].key = item 
                myCollection.push(comicData[item]);
                // console.log(comicData[item].key)
                // console.log(myCollection);
            }
            //put id of each comic into an array called comicIds
            const comicIds = myCollection.map((item) => {
                return item.id;
            })  
            //Maps over comidIds array and passes each comic id into getComic function
            const comicRequests = comicIds.map((id) => {
                return this.getComic(id)
            })
            // console.log(comicRequests);
            //When you get all of the results, show me the final product
            Promise.all(comicRequests).then((results) => {
                console.log(results);
                const beerMe = results.map((beer) => {
                    return beer.data.data.results[0]
                    //  beer.title
                })
                this.setState ({
                    collection: beerMe
                })
            })
        })
        
        
        // console.log(this.state.collection);
    }
    

    render() {
        return (
            <div>
                {this.state.collection.map((item, i) => {
                    return (
                        <div key={i}>
                            // <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt=""/>
                            <p>{item.title}</p>
                        </div>

                    )
                })}


                {/* <p>{this.state.collection.map((item) => {
                    return item.title
                })}</p> */}

            </div>
        )
    }
}

export default MyCollection; 