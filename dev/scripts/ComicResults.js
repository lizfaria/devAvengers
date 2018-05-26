import React from 'react';
import ComicTitle from './ComicTitle';
import ComicWriters from './ComicWriters';
import ComicImage from './ComicImage';
import firebase from 'firebase';

class ComicResults extends React.Component{ 
    constructor(){
        super();
        // this.state = {
        //     // collection: [],
        //     id: ''
        // };
        this.handleClick = this.handleClick.bind(this);
        this.getComic = this.getComic.bind(this);
    }    

    handleClick(e) {

        // this.setState ({
        //     id: e.target.value
        // })
        const collectionItem = e.target.value;
        const collection = {
            id: collectionItem
        };
        const dbRef = firebase.database().ref('collection');
        dbRef.push(collection)
    }

    getComic() {
           return this.props.comics.map((comic, i) => {
                return (
                    <div key={comic.id} className="comicContainer">
                        <ComicImage 
                        image= {`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
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
                        <button onClick={this.handleClick} value={comic.id}>Add Comic to My Collection</button>
                    </div>
                )
            })
        
    }
    render() {
        return(
            <div>
                {this.getComic()}
            </div>
        )
    }

    
    
}
// getComicResults();

export default ComicResults;
