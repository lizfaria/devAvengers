import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ComicTitle from './ComicTitle';
import ComicWriters from './ComicWriters';
import ComicImage from './ComicImage';
import firebase from 'firebase';

class ComicResults extends React.Component{ 
    constructor(){
        super();
        this.state = {
            // collection: [],
            id: '',
            userId: "" 
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSeries = this.handleClickSeries.bind(this);
        this.getComic = this.getComic.bind(this);
        // this. getUrl = this.getUrl.bind(this);
    }    

    handleClick(e) {
        const collectionItem = e.target.value;
        const collection = {
            id: collectionItem,
            series: '',
        };     
        if (firebase.auth().currentUser != null) {
            const user = firebase.auth().currentUser.uid;
            const dbRef = firebase.database().ref(`collection/${user}`);
            dbRef.push(collection)
            this.setState({
                userId: user
            })
        } else alert("Please Sign In")
        
}

    handleClickSeries(e) {
        const seriesItem = e.target.value;
        const seriesId = seriesItem.split(`/`);
        // split the url at the slash points and store last value in array
        // console.log(seriesId[6]);
        const collection = {
            id: '',
            series: seriesId[6]
        };
        if (firebase.auth().currentUser != null) {
            const user = firebase.auth().currentUser.uid;
            const dbRef = firebase.database().ref(`collection/${user}`);
            dbRef.push(collection)
            this.setState({
                userId: user
            })
        } else alert("Please Sign In")
      
        
        }


    getComic() {
           return this.props.comics.map((comic, i) => {
                return (
                    <div key={comic.id} className="comicContainer">
                        <ComicImage 
                            image={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} 
                            url={comic.urls[0].url} 
                        />

                        <ComicTitle 
                        title= {comic.title} />
                        {/* {comic.creators.items.filter((item) => {
                            return (
                                item.role === 'writer'
                            )
                        }).map((item, n) => {
                            return (
                                <ComicWriters 
                                writers= {item.name} key={n}/>
                            )
                        })} */}

                        <div className="addToCollection">
                            <button className="cart cartComic" onClick={this.handleClick} value={comic.id}>Add to comic Collection</button>
                        
                            <button className="cart cartSeries" onClick={this.handleClickSeries} value={comic.series.resourceURI}>Add series to collection</button>
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
