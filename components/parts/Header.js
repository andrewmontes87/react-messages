import React from 'react'
import Display from './Display'

class Header extends React.Component {

	constructor() {
		super();
		this.logout = this.logout.bind(this);
	}

	logout() {
		this.props.emit('exit', {});
	}

	render() {
		return (
			<header className="row">
				<div className="col-xs-10">
					<h1>Messages v0.1.4</h1>
					<Display if={this.props.member.name}>
						<h3>Welcome, {this.props.member.name} <a onClick={this.logout} className="btn btn-danger">Logout</a></h3>
					</Display>
				</div>
				<div className="col-xs-2">
					<div id="connection-status" className={this.props.status}></div>
				</div>

			</header>
		);
	}
}

// React ES6 properties
Header.propTypes = {
	member: React.PropTypes.object.isRequired,
	status: React.PropTypes.string.isRequired,
	emit: React.PropTypes.func.isRequired
};

Header.defaultProps = {
	member: {
		name: ""
	},
	status: 'disconnected'
}

module.exports = Header;
