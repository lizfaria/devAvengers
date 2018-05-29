import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

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
    handleChange(e) {
        e.preventDefault();  
        this.props.changeSearchState(e.target.value);
    }

    handleSubmitByComic(e){
        e.preventDefault();
        this.props.searchByComic(); 
        this.props.history.push('/ComicResults');
        
    }

    handleSubmitByCharacter(e) {
        e.preventDefault();
        this.props.searchByCharacter();
        this.props.history.push('/ComicResults');
    }

    searchComic() {
        // change button style on click
        document.getElementById('comic-button').classList.remove('button-clicked');
        document.getElementById('comic-button').classList.add('button');
        document.getElementById('character-button').classList.add('button');
        document.getElementById('character-button').classList.remove('button-clicked');
        this.setState({
            searchComic: true,
            searchCharacter: false
        })
    }

    searchCharacter() {       
        // change button style on click 
        document.getElementById('comic-button').classList.add('button');
        document.getElementById('comic-button').classList.remove('button-clicked');
        document.getElementById('character-button').classList.remove('button');
        document.getElementById('character-button').classList.add('button-clicked');
        this.setState({
            searchCharacter: true,
            searchComic : false
        })
    }

    render () {
        return (
        <div className="mainPage">
            <div className="search-bar-container">

                <div className="button-container">
                    <button class="button-clicked" id="comic-button" onClick={() => this.searchComic()}>Search by Comic</button>
                    <button class="button" id="character-button" onClick={() => this.searchCharacter()}>Search by Character</button>
                </div>

                {this.state.searchComic === true ? (
                    <form action="" onSubmit={this.handleSubmitByComic} className="comicForm clearfix">
                        <input type="text" onChange={this.handleChange} value={this.props.search} className="homeSearch" />
                            <input type="submit" className="homeSubmit" value=""/>
                    </form>
                ) : null}

                {this.state.searchCharacter === true ? (
                <form action="" onSubmit={this.handleSubmitByCharacter} className="characterForm clearfix">
                    <input type="text" onChange={this.handleChange} value={this.props.search} className="homeSearch" />

                        <input type="submit" value="" className="homeSubmit" />
                </form>
                ) : null}
                
            </div>
        </div>
        )
    }
}

export default SearchBar;