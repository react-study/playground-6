import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

const filterNames = ['all', 'active', 'completed'];

const Footer = ({
    filter,
    activeLength,
    completedLength,
    clearCompleted
}) => {
    const filters = filterNames.map(v => (
        <li key={v}>
            <Link className={filter === v ? 'selected' : ''}
                to={`/${v}`}
            >{v}</Link>
        </li>
    ));

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeLength}</strong> {' '}
                <span>item{activeLength === 1 ? '' : 's'}</span>{' '}
                left
            </span>
            <ul className="todo-filters">
                {filters}
            </ul>
            <button 
                className={ClassNames('todo-delete-completed', {
                    hidden: !completedLength
                })}
                onClick={clearCompleted}>
                    Clear Completed
            </button>
        </footer>
    );
}

export default Footer;