import React from 'react'
import Router from 'react-router'
import io from 'socket.io-client'
import Header from './parts/Header'
var { RouteHandler } = Router;

class APP extends React.Component {

	// ES6 method declaration
	// class constructor
	constructor() {
		super();
		this.state = {
			status: 'disconnected',
			member: {},
			audience: [],
			messages: []
		};
		this.emit = this.emit.bind(this);
	}

	componentWillMount() {

		// PRODUCTION
		// this.socket = io('/');

		// DEVELOPMENT
		this.socket = io();


		// ES6 arrow functions
		this.socket.on('connect', () => {
			var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

			if (member && member.type === 'member') {
				this.emit('join', member);
			}

			this.setState({status:'connected'});
		});


		this.socket.on('disconnect', () => {
			this.setState({
				status:'disconnected',
				member: {}
			});
		});

		this.socket.on('welcome', x => this.setState(x));

		this.socket.on('joined', (member) => {
			sessionStorage.member = JSON.stringify(member);
			this.setState({ member: member });
		});

		this.socket.on('exited', () => {
			this.setState({ member: {} });
		});

		this.socket.on('audience', (newAudience) => {
			this.setState({ audience: newAudience });
		});

		this.socket.on('consoleLog', (log) => {
			console.log('consoleLog says:');
			console.log(log);
		});

		this.socket.on('messageUpdate', (newMessages) => {
			this.setState({ messages: newMessages });
		});

		// ????
		this.socket.on('end', x => this.setState(x));


	}

	emit(eventName, payload) {
		this.socket.emit(eventName, payload);
	}

	render() {
		return (
			<div>
				<Header emit={this.emit} {...this.state} />
				<RouteHandler emit={this.emit} {...this.state} />
			</div>
		);
	}
}

module.exports = APP;