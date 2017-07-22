import React from 'react';
import ClassNames from 'classnames';

const Footer = ({
    activeLength,
    completedLength,
    clearCompleted
}) => (
    <footer className="footer">
        <span className="todo-count">
            <strong>{activeLength}</strong> {' '}
            <span>item{activeLength === 1 ? '' : 's'}</span>{' '}
            left
        </span>
        <ul className="todo-filters">
            <li><a href="">All</a></li>
            <li><a href="">Active</a></li>
            <li><a href="">Completed</a></li>
        </ul>
        <button 
            className={ClassNames('todo-delete-completed', {
                hidden: !completedLength
            })}
            onClick={clearCompleted}>
                Clear Completed
        </button>
    </footer>
)

export default Footer;