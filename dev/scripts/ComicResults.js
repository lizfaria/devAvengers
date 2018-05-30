import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
    } from "react-router-dom";
import ComicTitle from "./ComicTitle";
import ComicImage from "./ComicImage";
import firebase from "firebase";

class ComicResults extends React.Component{ 
    constructor(){
        super();
        this.state = {
            id: "",
            userId: "" 
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSeries = this.handleClickSeries.bind(this);
        this.getComic = this.getComic.bind(this);
    }    

    //When you click on button, comic will be saved to firebase
    handleClick(e) {
        const collectionItem = e.target.value;
        const collection = {
            id: collectionItem,
            series: "",
        };     
        if (firebase.auth().currentUser != null) {
            const user = firebase.auth().currentUser.uid;
            const dbRef = firebase.database().ref(`collection/${user}`);
            dbRef.push(collection)
            this.setState({
                userId: user
            })
        } else alert("Please sign in.")
}

    //When you click on button, series will be saved to firebase
    handleClickSeries(e) {
        const seriesItem = e.target.value;
        const seriesId = seriesItem.split(`/`);
        // split the url at the slash points and store last value in array --> series ID
        const collection = {
            id: "",
            series: seriesId[6]
        };
        if (firebase.auth().currentUser != null) {
            const user = firebase.auth().currentUser.uid;
            const dbRef = firebase.database().ref(`collection/${user}`);
            dbRef.push(collection)
            this.setState({
                userId: user
            })
        } else alert("Please sign in.")
    }

    //Function to display all info that is pushed to render(image, title, add comic/series to collection)
    getComic() {
        return this.props.comics.map((comic, i) => {
            return (
                <div key={comic.id} className="comicContainer">
                    <ComicImage 
                        image={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} 
                        url={comic.urls[0].url} 
                    />

                    <ComicTitle title= {comic.title} />
        
                    <div className="addToCollection">
                        <button className="cart cartComic" onClick={this.handleClick} value={comic.id}>Add Comic to Collection</button>
                        <button className="cart cartSeries" onClick={this.handleClickSeries} value={comic.series.resourceURI}>Add Series to Collection</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return(
            <div className="comicResults">
                <div className="wrapper clearfix">
                    {this.getComic()}
                </div>
            </div>
        )
    }
}

export default ComicResults;
