import React from'react'

class Attendance extends React.Component {

	addMemberRow(member, i) {
		return (
			<tr key={i}>
				<td>{member.name}</td>
			</tr>
		);
	}

	render() {
		return (
			<div>
				<h2>{this.props.audience.length} online now</h2>
				<table className="table table-striped">
					<tbody>
						{this.props.audience.map(this.addMemberRow)}
					</tbody>
				</table>

			</div>
		);
	}
}

module.exports = Attendance;