import React from 'react';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
        this.logOut = this.logOut.bind(this);

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userLog: "loggedIn" })
        });
    };

    componentDidMount() {
        this.dbRef = firebase.database().ref('collection');
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.dbRef.on('value', (snapshot) => {
                    // console.log(snapshot.val());
                });
                this.setState({
                    loggedIn: true
                })
            } else {
                // console.log('user logged out')
                this.setState({
                    loggedIn: false
                })
            }
        });
    }

    loginWithGoogle() {
        console.log("clicked the button")
        const provider = new firebase.auth.GoogleAuthProvider

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                // console.log(user);
            })
            .catch((err) => {
                // console.log(err);
            })
    }
    logOut() {
        firebase.auth().signOut();
        this.dbRef.off('value');
        // console.log('signout')
    }

    render() {
        return (
        <nav className="clearfix">
    
         
                <div className="logo-container">
                    <Link to="/"><img id="bnw" src="http://preview.ibb.co/kEMjQb/marvel.png" width="200"></img></Link>
                </div>
           

                <div className="nav-container clearfix">
                <div className="userStatus">
                    {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>sign in</button>}
                    {this.state.loggedIn === true ? <button onClick={this.logOut}>sign out</button> : null}
                </div>
                <div className="bookmark-container">
                    <Link to="/MyCollection">
                        my collection
                    </Link>
                </div>
            </div>
        </nav>
    )
    }    
}

export default Header;