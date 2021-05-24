import React, { Component } from 'react';
import ToDoItem from './todo-item.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
class ToDoList extends Component {
    constructor() {
        super()
        this.state = {
            itemDescription: '',
            dueDate: new Date(),
            filterValue: '',
            toDoItems: []
        };
        this.submitNotes = this.submitNotes.bind(this);
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

    handleDelete(id) {
        let todoItems = this.state.toDoItems.filter((item) => item.id !== id);
        this.setState({ toDoItems: todoItems });
    }

    handleChange(item) {
        let todoItems = this.state.toDoItems;
        if (item.description && item.description.length > 0) {
            todoItems[item.index].description = item.description;
        } else if (item.dueDate) {
            todoItems[item.index].dueDate = item.dueDate;
        }
        this.setState({
            toDoItems: todoItems
        })
    }

    submitNotes() {
        // Since we don't have a real API to make a POST call here we will store the data in local storage. 
        localStorage.setItem('toDoList', JSON.stringify(this.state.toDoItems));
    }

    render() {
        const toDoItems = this.state.toDoItems;
        return (
            <>
                <div className="container p-4 d-flex">
                    <input type="text"
                        onChange={(event) => this.setState({itemDescription: event.target.value})}
                        value={this.state.itemDescription}
                        className="form-control" />
                    <DatePicker
                        selected={this.state.dueDate}
                        onChange={(date) => this.setState({dueDate: date})}
                        minDate={new Date()}
                        name="dueDate"
                        dateFormat="MM/dd/yyyy"
                    />
                    <button onClick={this.AddNewItem} className="btn btn-primary add-btn">ADD</button>
                </div>
                <div className="container d-flex">
                    <div className='col-4'>
                        <span>Filter items by description</span>
                    </div>
                    <div className='col-8'>
                        <input type="text"
                            onChange={(event) => this.setState({filterValue: event.target.value})}
                            className="form-control" />
                    </div>
                </div>
                <div className='container'>
                    <div className='m-t-3'>
                        {toDoItems.filter(item => item.description.toLowerCase().includes(this.state.filterValue.toLowerCase())).map((item, index) => {
                            return <ToDoItem key={index} item={item}
                                onChange={this.handleChange}
                                onClick={this.handleDelete} />
                        })}
                    </div>
                </div>
                <div className='container'>
                    <button onClick={this.submitNotes} className="btn btn-primary">Submit</button>
                </div>
            </>
        )
    }
}

export default ToDoList;