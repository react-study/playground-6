import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';


const filterNames = ["all", "acitve", "completed"];
const Footer = ({
  filter,
  activeLength,
  completedLength,
  clearCompleted,

}) => {

  const filters = filterNames.map(v => (
    <li key={v}>
      <Link
        className = {filter === v? "selected" : ""}
        to={`/${v}`}
      >{v}</Link>
    </li>
  ));

  return (
    <div className="footer">
        <span className="todo-count">
          <strong>{activeLength}</strong>{' '}
          <span>item{activeLength === 1 ? "" : "s"}</span>{' '}
          <span>left</span>
        </span>
        <ul className="todo-filters">
          {filters}
        </ul>
        <button
          className={ClassNames("todo-delete-completed", {
            hidden: !completedLength
          })}
          onClick={clearCompleted}
        >Clear Completed</button>
    </div>

  )

};


export default Footer;
