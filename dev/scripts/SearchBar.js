import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();  
        this.props.changeSearchState(e.target.value);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.searchComic();
    }

    render () {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} value={this.props.search}/>
                <input type="submit" value="Search"/>
            </form>
        )
    }
}

export default SearchBar;