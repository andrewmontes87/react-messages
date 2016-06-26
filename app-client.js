
// ES6 import
import React from 'react'
import Router from 'react-router'
import APP from './components/APP'
import Message from './components/Message'
import Whoops404 from './components/Whoops404'

// ES6 dereferencing assignment
var {Route, DefaultRoute, NotFoundRoute } = Router;


var routes = (
	<Route handler={APP}>
		<DefaultRoute handler={Message} />
		<NotFoundRoute handler={Whoops404} />
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('react-container'));
});

