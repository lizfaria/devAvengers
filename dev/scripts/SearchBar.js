import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
    } from "react-router-dom";

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchComic: true,
            searchCharacter: false
        }
        this.searchComic = this.searchComic.bind(this);
        this.searchCharacter = this.searchCharacter.bind(this);
        this.handleSubmitByComic = this.handleSubmitByComic.bind(this);
        this.handleSubmitByCharacter = this.handleSubmitByCharacter.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Check for change in search input, passes information to changeSearchState function in app.js
    handleChange(e) {
        e.preventDefault();  
        this.props.changeSearchState(e.target.value);
    }

    //On click, runs searchByComic function(app.js) & loads ComicResults in app.js render
    //this.props.history.push creates a manual link (instead of using Link tags)
    handleSubmitByComic(e){
        e.preventDefault();
        this.props.searchByComic(); 
        this.props.history.push("/ComicResults");
    }

    //On click, runs searchByCharacter function(app.js) & loads ComicResults in app.js render
    //this.props.history.push creates a manual link (instead of using Link tags)
    handleSubmitByCharacter(e) {
        e.preventDefault();
        this.props.searchByCharacter();
        this.props.history.push("/ComicResults");
    }

    searchComic() {
        // change button style on click
        document.getElementById("comic-button").classList.remove("button");
        document.getElementById("comic-button").classList.add("button-clicked");
        document.getElementById("character-button").classList.add("button");
        document.getElementById("character-button").classList.remove("button-clicked");
        this.setState({
            searchComic: true,
            searchCharacter: false
        })
    }

    searchCharacter() {       
        // change button style on click 
        document.getElementById("comic-button").classList.add("button");
        document.getElementById("comic-button").classList.remove("button-clicked");
        document.getElementById("character-button").classList.remove("button");
        document.getElementById("character-button").classList.add("button-clicked");
        this.setState({
            searchCharacter: true,
            searchComic : false
        })
    }

    render () {
        return (
        <div className="mainPage">
            <div className="wrapper">
                <div className="search-bar-container">
                    <div className="button-container">
                        <button className="button-clicked" id="comic-button" onClick={() => this.searchComic()}>Search by Comic</button>
                        <button className="button" id="character-button" onClick={() => this.searchCharacter()}>Search by Character</button>
                    </div>

                    {/* Ternary operator to show or not show search input */}
                    {this.state.searchComic === true ? (
                        <form action="" onSubmit={this.handleSubmitByComic} className="comicForm clearfix">
                            <input type="text" onChange={this.handleChange} value={this.props.search} className="homeSearch" placeholder="Comic Search" />
                            <input type="submit" className="homeSubmit" value=""/>
                        </form>
                    ) : null}

                    {/* Ternary operator to show or not show search input */}
                    {this.state.searchCharacter === true ? (
                    <form action="" onSubmit={this.handleSubmitByCharacter} className="characterForm clearfix">
                        <input type="text" onChange={this.handleChange} value={this.props.search} className="homeSearch" placeholder="Character Search" />
                        <input type="submit" value="" className="homeSubmit" />
                    </form>
                    ) : null}
                </div>
            </div>
        </div>
        )
    }
}

export default SearchBar;