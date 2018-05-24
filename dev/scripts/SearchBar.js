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
           <div>
                <form action="" onSubmit={this.handleSubmitByComic}>
                    <input type="text" onChange={this.handleChange} value={this.props.search}/>
                    <input type="submit" value="Search by Comic"/>
                </form>
            
                <form action="" onSubmit={this.handleSubmitByCharacter}>
                    <input type="text" onChange={this.handleChange} value={this.props.search} />
                    <input type="submit" value="Search By Character" />
                </form>
           </div>
        )
    }
}

export default SearchBar;