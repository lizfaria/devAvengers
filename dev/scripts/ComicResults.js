import React from 'react';
import ComicTitle from './ComicTitle';
import ComicWriters from './ComicWriters';
import ComicImage from './ComicImage';
import firebase from 'firebase';

class ComicResults extends React.Component{ 
    constructor(){
        super();
        this.state = {
            // collection: [],
            id: ''
                };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSeries = this.handleClickSeries.bind(this);
        this.getComic = this.getComic.bind(this);
        // this.hide = this.hide.bind(this);
    }    

    handleClick(e) {
        const collectionItem = e.target.value;
        const collection = {
            id: collectionItem,
            series: ''        
        };
        
        if (firebase.auth().currentUser != null) {
            const user = firebase.auth().currentUser;
            const dbRef = firebase.database().ref('collection');
            dbRef.push(collection)

        //     const buttonSave = document.getElementById(`${collection.id}`);
        //     console.log('buttonSave')
        //     buttonSave.classList.add("saved");
        //     buttonSave.innerHTML = "Saved!";
        // }
        //  else {
        //     this.setState({ mustLogin: true })
        // }
    }
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
            const user = firebase.auth().currentUser;
            const dbRef = firebase.database().ref('collection');
            dbRef.push(collection) 
        }
    }
        
        

        //     const buttonSave = document.getElementById(`${collection.id}`);
        //     // console.log(buttonSave)
        //     buttonSave.classList.add("saved");
        //     buttonSave.innerHTML = "Saved!";
        // } else {
        //     this.setState({ mustLogin: true })
        // }

    // hide() {
    //     this.setState({ mustLogin: false })
    // }

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
                        <button onClick={this.handleClickSeries} value={comic.series.resourceURI}>Add Series to My Collection</button>
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
export default ComicResults;
