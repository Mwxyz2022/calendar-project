import React from 'react';
import PropTypes from 'prop-types';

import './redline.scss';

const RedLine = ({ redlinePosition }) => {
	return (
		<div className="redLine" style={{ top: redlinePosition }}>
			<div className="redLine__line"></div>
			<span className="redLine__point"></span>
		</div>
	);
};

RedLine.propTypes = {
	redlinePosition: PropTypes.string.isRequired,
};
export default RedLine;
