import React from'react'

class EmitMessage extends React.Component {

	constructor() {
		super();
		this.send = this.send.bind(this);
		this.sticker = this.sticker.bind(this);
	}

	sticker(message) {
		this.props.emit('emitMessage', { message: message, name: this.props.member.name });
	}

	send() {
		var message = React.findDOMNode(this.refs.send).value;
		this.props.emit('emitMessage', { message: message, name: this.props.member.name });
		React.findDOMNode(this.refs.send).value = '';
	}

	render() {
		return (
		    <form action="javascript:void(0)" onSubmit={this.send}>
		    	<label>Message</label>
		     	<input ref="send"
		     		   className="form-control" 
		     		   id="m"
		     		   placeholder="type your message..."
		     		   autoComplete="off" />
		     	<button className="btn btn-primary">
		     		Send
		     	</button>
		     	<img src='/img/cat_1.png'
			     	 className="sticker"
			     	 onClick={this.sticker.bind(this, "|STICKER_1|")} />
		     	<img src='/img/cat_2.png'
			     	 className="sticker"
			     	 onClick={this.sticker.bind(this, "|STICKER_2|")} />
		    </form>
		);
	}
}

module.exports = EmitMessage;