import React, { Component, useState } from 'react';
import ToDoItem from './todo-item.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemDescription: '',
            dueDate: new Date(),
            toDoItems: []
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.AddNewItem = this.AddNewItem.bind(this);
    }

    componentDidMount() {
        // At this point we will assume that this array is a part of an API response 
        // Let's imagine that we are making a GET call here. 
        const items = [
            { id: 0, description: 'Wash the car', dueDate: new Date() },
            { id: 1, description: 'Clean the house', dueDate: new Date() },
            { id: 2, description: 'Cook some foods', dueDate: new Date() }]
        this.setState({
            toDoItems: items
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        })
    }

    handleItemChange(event) {
        this.setState({
            itemDescription: event.target.value
        })
    }

    AddNewItem() {
        const newToDOItem = {
            id: this.state.toDoItems.length,
            description: this.state.itemDescription,
            dueDate: this.state.dueDate,
        };
        const toDoItems = this.state.toDoItems;
        toDoItems.push(newToDOItem);
        this.setState({
            toDoItems: toDoItems
        })
        this.setState({
            itemDescription: ''
        })
    }

    handleDelete(index) {
        let todoItems = this.state.toDoItems.filter((item) => item.id !== index);
        this.setState({ toDoItems : todoItems });
    }

    handleChange(value) {
        let todoItems = this.state.toDoItems;
        if (typeof(value.value) === 'string') {
            todoItems[value.index].description = value.value;
        } else {
            todoItems[value.index].dueDate = value.value;
        }
        this.setState({
            toDoItems: todoItems
        })
    }

    render() {
        const toDoItems = this.state.toDoItems;
        return (
            <>
                <div className="container p-4 d-flex">
                    <input type="text" 
                           onChange={this.handleItemChange} 
                           value={this.state.itemDescription}
                           className="form-control" />
                    <DatePicker
                        selected={this.state.dueDate}
                        onChange={this.handleDateChange}
                        name="dueDate"
                        dateFormat="MM/dd/yyyy"
                    />
                    <button onClick={this.AddNewItem} className="btn btn-primary add-btn">ADD</button>
                </div>
                <div className='container'>
                    <div className='m-t-3'>
                        {toDoItems.map((item, index) => {
                           return <ToDoItem key={index} item={item} 
                           onChange={this.handleChange}
                           onClick={this.handleDelete}/>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default ToDoList;