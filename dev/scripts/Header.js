import React from "react";
import firebase from "firebase";
import {
    BrowserRouter as Router,
    Route,
    Link
    } from "react-router-dom";

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

    //Check if user is logged in and affect the rendering accordingly (sign in/sign out)
    componentDidMount() {
        this.dbRef = firebase.database().ref("collection");
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.dbRef.on("value", (snapshot) => {
                });
                this.setState({
                    loggedIn: true
                })
            } else {
                this.setState({
                    loggedIn: false
                })
            }
        });
    }
    
    //Firebase function to login with Google
    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
            })
            .catch((err) => {
            })
    }
    logOut() {
        firebase.auth().signOut();
        this.dbRef.off("value");
    }

    render() {
        return (
        <nav className="clearfix">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to="/"><img id="bnw" src="../../assets//marvel.png" width="200"></img></Link>
                </div>
                <div className="nav-container clearfix">
                    <div className="bookmark-container">
                        <Link to="/MyCollection">
                            My Collection
                        </Link>
                    </div>
                    <div className="userStatus">
                        {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Log In</button>}
                        {this.state.loggedIn === true ? <button onClick={this.logOut}>Log Out</button> : null}
                    </div>
                </div>
            </div>
        </nav>
        )
    }    
}

export default Header;