import React from 'react';
import ClassNames from 'classnames';

const filterNames = ['All','Active','Completed'];
const Footer = ({
	activeLength,
	completedLength,
	clearCompleted,
	filter,
	selectFilter
}) =>{

	const filters = filterNames.map(v => (
		<li key={v}>
			<a 
			onClick={() =>selectFilter(v)}
			className={filter === v ? 'selected' : ''}>{v}</a>
		</li>
		));
	return (
	<div className="footer">
		<span className="todo-count"><strong>{activeLength}</strong>{' '}<span>item{activeLength !==1 ? 's' : ''}</span> left</span>
		<ul className="todo-filters">
			{filters}
		</ul>
		<button className={ClassNames('todo-delete-completed',{
			Hidden : !completedLength
		})} onClick={clearCompleted} >Clear Complete</button>
	</div>
)
}



export default Footer;