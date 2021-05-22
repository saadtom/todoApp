import React, { Component, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            toDoItems: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.AddNewItem = this.AddNewItem.bind(this);
    }

    componentDidMount() {
        // At this point we will assume that this array is a part of an API response 
        // Let's imagine that we are making a GET call here. 
        const items = [{ id: 0, description: 'Wash the car', dueDate: new Date() },
        { id: 1, description: 'Clean the house', dueDate: new Date() },
        { id: 2, description: 'Cook some foods', dueDate: new Date() }]
        this.setState({
            toDoItems: items
        });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    AddNewItem() {
        console.log(this.state.startDate);
    }

    render() {
        const toDoItems = this.state.toDoItems;
        return (
            <>
                <div className="container p-4 d-flex">
                    <input type="text" className="form-control" />
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        name="startDate"
                        dateFormat="MM/dd/yyyy"
                    />
                    <button onClick={this.AddNewItem} className="btn btn-primary add-btn">ADD</button>
                </div>
                <div className='container'>
                    <div className='m-t-3'>
                        {toDoItems.map((item, index) => {
                            return <div className="item-wrapper" key={index}>
                                <div className="d-block">
                                    <strong>Description:</strong> <span>{item.description}</span>
                                </div>
                                <div className="d-block">
                                    <strong>Due Date:</strong> <span>{item.dueDate.toLocaleDateString()}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default ToDoList;