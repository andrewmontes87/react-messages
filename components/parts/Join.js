import React from'react'

class Join extends React.Component {

	constructor() {
		super();
		this.join = this.join.bind(this);
	}

	join() {
		var memberName = React.findDOMNode(this.refs.name).value;
		this.props.emit('join', { name: memberName });
	}

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.join}>
				<label>What is your name?</label>
				<input ref="name"
					   className="form-control"
					   placeholder="enter your full name..."
					   required />
				<button className="btn btn-primary">Join</button>
			</form>
		);
	}

}

module.exports = Join;