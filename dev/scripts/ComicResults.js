import React from 'react';

import axios from 'axios';
import CryptoJS from 'crypto-js';
import ComicTitle from './ComicTitle';
import ComicWriters from './ComicWriters';
import ComicImage from './ComicImage';

const PUBLIC_KEY = "a7cf3b7902087aaf6031f05fab9fb738";
const PRIV_KEY = "442fd6fb50eb89717021a29e0c676e785f2687a5";
const ts = new Date().getTime();

class ComicResults extends React.Component{
    constructor(){
        super();
        this.state = {
            comics: []
        }
    }
    
    componentDidMount(){
        // e.preventDefault();
        //API call for seach movies
        axios.get('http://gateway.marvel.com/v1/public/comics', {
            params: {
                ts: ts,
                apikey: "a7cf3b7902087aaf6031f05fab9fb738",
                hash: CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString(),
                titleStartsWith: "avengers"
                // Get Images
                // http://i.annihil.us/u/prod/marvel/i/mg/9/f0/5af369f557bc4/portrait_uncanny.jpg
            }
        })
            .then((res) => {
                console.log(res);
                
                this.setState({
                    comics: res.data.data.results
                })
            })
    }

    getComic() {
           return this.state.comics.map((comic, i) => {
                return (
                    <div key={comic.id}>
                        <ComicImage 
                        image= {`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
                        <ComicTitle 
                        title= {comic.title} />
                        {comic.creators.items.filter((item) => {
                            return (
                                item.role === 'writer'
                            )
                        }).map((item, n) => {

                            return (
                                <ComicWriters 
                                writers= {item.name} key={n}/>
                            )
                        })}

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
