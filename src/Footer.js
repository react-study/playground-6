import React from 'react';
import ClassNames from 'classnames';

const filterNames = ['All', 'Active', 'Completed'];

const Footer = ({
    filter,
    activeLength,
    completedLength,
    clearCompleted,
    selectFilter
}) => {
    const filters = filterNames.map(v => (
        <li key={v}>
            <a
                className={filter === v ? 'selected' : ''}
                onClick={()=> selectFilter(v)}
            >{v}</a>
        </li>
    ));

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeLength}</strong>{' '}
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
                onClick={clearCompleted}
            >Clear Completed</button>
        </footer>
    );
};

export default Footer;
