import React from 'react';

const ComicImage = (props) => {
    return (
        <a href={props.url} target="_blank">
        <img src={props.image} alt="" className="comicCover" />
        </a>
    )
}

export default ComicImage;