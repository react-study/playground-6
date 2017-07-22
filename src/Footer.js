import React from 'react';

class Footer extends React.Component{
    render(){
        return (
            <footer className="footer">
                <span className="todo-count">
                    0 items left
                </span>
                <ul className="todo-filters">
                    <li><a href="">All</a></li>
                    <li><a href="">Active</a></li>
                    <li><a href="">Completed</a></li>
                </ul>
                <button 
                    className="todo-delete-completed"
                    onClick={this.props.clearCompleted}>
                        Clear Completed
                </button>
            </footer>
        )
    }
}

export default Footer;
