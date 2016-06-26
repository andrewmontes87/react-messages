import React from 'react'
import Router from'react-router'
var Link = Router.Link;

class Whoops404 extends React.Component {
	render() {
		return (
			<div id="not-found">
				<h1>Whoops...</h1>
				<p>We cannot find what you want!</p>

				<Link to="/">Back to the message board</Link>
			</div>
		);
	}
}

module.exports = Whoops404;