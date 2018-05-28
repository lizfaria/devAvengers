import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class SearchBar extends React.Component {
    constructor() {
        super();
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
    }



    render () {
        return (
            <div className="mainPage">
                <div className="search-bar-container">
                    {/* <div className="button-container">
                        <button onClick={this.handleSearchtByComic}>Search by Character</button>
                        <button onClick={this.handleSearchByCharacter}>Search by Comic</button>
                    </div> */}

                    <form action="" onSubmit={this.handleSubmitByComic} className="comicForm clearfix">
                        <input type="text" onChange={this.handleChange} value={this.props.search} placeholder="Search by Comic" className="homeSearch" />
                            <input type="submit" className="homeSubmit" value=""/>
                    </form>

                    <form action="" onSubmit={this.handleSubmitByCharacter} className="characterForm clearfix">
                        <input type="text" onChange={this.handleChange} value={this.props.search} placeholder="Search by Character" className="homeSearch" />

                            <input type="submit" value="Search" className="homeSubmit" />
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;