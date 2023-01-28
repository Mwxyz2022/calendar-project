import React from 'react';

import './redline.scss';

const RedLine = ({ redlinePosition }) => {
	return (
		<div className="redLine" style={{ top: redlinePosition }}>
			<div className="redLine__line"></div>
			<span className="redLine__point"></span>
		</div>
	);
};

export default RedLine;
