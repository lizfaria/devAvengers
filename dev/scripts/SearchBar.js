import React from 'react';

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
    }

    handleSubmitByCharacter(e) {
        e.preventDefault();
        this.props.searchByCharacter();
    }

    render () {
        return (
            <div className="search-bar-container">
                <form action="" onSubmit={this.handleSubmitByComic} className="comicForm">
                    {/* <label htmlFor="search by comic"></label> */}
                    <input type="text" onChange={this.handleChange} value={this.props.search} placeholder="Search by Comic" className="homeSearch" />
                    <input type="submit" value="Search" className="homeSubmit" />

                    {/* <input type="radio" name="search-option" value="by comic" /> 
                    <label htmlFor="search by comic">by comic</label>
                    
                    <input type="radio" name="search-option" value="by character"/> 
                    <label htmlFor="search by character"> by character</label> */}
                </form>

                <form action="" onSubmit={this.handleSubmitByCharacter} className="characterForm">
                    <input type="text" onChange={this.handleChange} value={this.props.search} placeholder="Search by Character" className="homeSearch" />
                    <input type="submit" value="Search" className="homeSubmit" />
                </form>
            </div>
        )
    }
}

export default SearchBar;