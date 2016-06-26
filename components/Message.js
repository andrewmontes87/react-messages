import React from 'react'
import Display from './parts/Display'
import EmitMessage from './parts/EmitMessage'
import MessageList from './parts/MessageList'
import Attendance from './parts/Attendance'
import Join from './parts/Join'

class Message extends React.Component {

	render() {
		return (
			<div id="message" className="row">
				
				<Display if={this.props.status === 'connected'}>
					<Display if={this.props.member.name}>
						<div className="col-xs-12">
							<div className="panel panel-info">
								<div className="panel-heading">
									<h3 className="panel-title">Send a message!</h3>
								</div>
								<div className="panel-body">
									<EmitMessage member={this.props.member} emit={this.props.emit} />
								</div>
							</div>
							
						</div>
						<div className="col-sm-3 col-sm-push-9">
							<Attendance audience={this.props.audience} />
						</div>
						<div className="col-sm-9  col-sm-pull-3">
							<MessageList messages={this.props.messages} />	
						</div>

						
					</Display>

					<Display if={!this.props.member.name}>
						<div className="col-xs-12">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h3 className="panel-title">Sign in with your name to see messages</h3>
								</div>
								<div className="panel-body">
									<Join emit={this.props.emit} />	
								</div>
							</div>
						</div>
					</Display>
				</Display>
			</div>
		);
	}
}

// React ES6 properties
Message.propTypes = {
	member: React.PropTypes.object.isRequired,
	messages: React.PropTypes.array.isRequired
};

Message.defaultProps = {
	member: {
		name: ""
	},
	messages: []
};

module.exports = Message;