import React from 'react';
import { months } from '../../utils/dateUtils';
import './header.scss';

const Header = ({ weekStartDate, weekDates, setStartWeek, setToggleModal }) => {
	const setCurrentDateHandler = () => {
		setStartWeek(new Date());
	};

	const openModal = () => {
		setToggleModal(true);
	};

	const changeWeekHandler = (updateWeek) => {
		setStartWeek(
			new Date(
				weekStartDate.setDate(weekStartDate.getDate() + updateWeek)
			)
		);
	};
	const getMonth = () => {
		const currentMonths = [
			...new Set(weekDates.map((day) => months[day.getMonth()])),
		];
		if (currentMonths.length === 1) {
			return currentMonths[0];
		}

		return `${currentMonths[0]} - ${currentMonths[1]}`;
	};

	return (
		<header className="header">
			<button className="button create-event-btn" onClick={openModal}>
				<svg width="36" height="36" viewBox="0 0 36 36">
					<path fill="#34A853" d="M16 16v14h4V20z"></path>
					<path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
					<path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
					<path fill="#EA4335" d="M20 16V6h-4v14z"></path>
					<path fill="none" d="M0 0h36v36H0z"></path>
				</svg>
				<span className="create-event-btn__create">Create</span>
			</button>
			<div className="navigation">
				<button
					className="navigation__today-btn button"
					onClick={setCurrentDateHandler}
				>
					Today
				</button>
				<button
					className="icon-button navigation__nav-icon"
					onClick={() => changeWeekHandler(-7)}
				>
					<i className="fas fa-chevron-left"></i>
				</button>
				<button
					className="icon-button navigation__nav-icon"
					onClick={() => changeWeekHandler(7)}
				>
					<i className="fas fa-chevron-right"></i>
				</button>
				<span className="navigation__displayed-month">
					{getMonth()}
				</span>
			</div>
		</header>
	);
};

export default Header;
