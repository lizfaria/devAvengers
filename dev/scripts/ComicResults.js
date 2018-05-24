import React from 'react';
import ComicTitle from './ComicTitle';
import ComicWriters from './ComicWriters';
import ComicImage from './ComicImage';

class ComicResults extends React.Component{
    constructor(){
        super();
    }    

    getComic() {
           return this.props.comics.map((comic, i) => {
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
