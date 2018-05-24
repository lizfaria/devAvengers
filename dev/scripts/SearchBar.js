import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    render () {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange}/>
                <input type="submit" value="submit"/>
            </form>
        )
    }
}

export default SearchBar;