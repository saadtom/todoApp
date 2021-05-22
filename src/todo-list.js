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
        const foo = [{ id: 0, description: 'Wash the car', dueDate: new Date() },
        { id: 1, description: 'Clean the house', dueDate: new Date() },
        { id: 2, description: 'Cook some foods', dueDate: new Date() }]
        this.setState({
            toDoItems: foo
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
                            return <div className="item-wrapper" key={index}>{item.description}</div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default ToDoList;