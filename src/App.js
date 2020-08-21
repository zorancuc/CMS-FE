import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import CreatePollMarkdown from './components/CreateProposal';
import { Cookies } from 'react-cookie';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

var cookies = new Cookies();

console.log(cookies);
if(localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login'
	}
} else if(cookies.get('token')) {
	let token = cookies.get("token");
	localStorage.setItem("jwtToken", token);
	cookies.remove('token');
	console.log("Removed");
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login'
	}
}

class App extends Component {
	render() {
		return (
			<Provider store = { store }>
				<Router>
					<div>
						{/* <Navbar /> */}
						<Route exact path="/" component={ CreatePollMarkdown } />
						<div className="container">
							<Route exact path="/register" component={ Register } />
							<Route exact path="/login" component={ Login } />
							{/* <Route exact path="/mywallet" component={ MyWallet } /> */}
							{/* <Route exact path="/exchange" component={ Exchange } /> */}
							<Route exact path="/proposal/create" component={ CreatePollMarkdown } />
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
