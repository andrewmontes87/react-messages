import React from'react'
import Moment from 'moment'
import Display from './Display'

class MessageList extends React.Component {

	addMessageRow(message, i) {
		return (
			<tr key={i}>
				<td>
					<small>{Moment(message.timestamp*1000).format('MMMM Do YYYY, h:mm:ss a')}</small>
				</td>
				<td>
					<Display if={message.message === '|STICKER_1|'}>
						<strong>{message.name}:</strong> <img src='/img/cat_1.png'
			     	 	 	 								  className="sticker" />
					</Display>
					<Display if={message.message === '|STICKER_2|'}>
						<strong>{message.name}:</strong> <img src='/img/cat_2.png'
			     	 	 	 								  className="sticker" />
					</Display>
					<Display if={message.message != '|STICKER_1|' && message.message != '|STICKER_2|'}>
						<strong>{message.name}:</strong> {message.message}
					</Display>
				</td>
			</tr>
		);
	}

	render() {
		return (
			<div>
				<h2>{this.props.messages.length} messages</h2>
				<table className="table table-striped">
					<tbody>
						{this.props.messages.map(this.addMessageRow)}
					</tbody>
				</table>
			</div>
		);
	}
}

module.exports = MessageList;