import React, { Component } from 'react';

class ToDoList extends Component {

    render() {
        return (
            <div className="container p-4 d-flex">
                <input type="text" className="form-control" />
                <button className="btn btn-primary add-btn">ADD</button>
            </div>
        )
    }
}

export default ToDoList;