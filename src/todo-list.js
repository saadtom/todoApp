import React, { useState, useEffect } from 'react';
import ToDoItem from './todo-item.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function ToDoList() {
    const [itemDescription, setItemDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [filterValue, setFilterValue] = useState('');
    const [toDoItems, setToDoItems] = useState([]);

    useEffect(() => {
        // At this point we will assume that this array is a part of an API response 
        // Let's imagine that we are making a GET call here. 
        const items = [
            { id: 0, description: 'Wash the car', dueDate: new Date() },
            { id: 1, description: 'Clean the house', dueDate: new Date() },
            { id: 2, description: 'Cook some foods', dueDate: new Date() }];
        setToDoItems(items);
    }, []);

    const AddNewItem = () => {
        const newToDOItem = {
            id: toDoItems.length,
            description: itemDescription,
            dueDate: dueDate,
        };
        setToDoItems(toDoItems => [...toDoItems, newToDOItem]);
        setItemDescription('');
        setFilterValue('');
    }

    const handleDelete = (id) => {
        let todoItems = toDoItems.filter((item) => item.id !== id);
        setToDoItems(todoItems);
    }

    const handleChange = (item) => {
        toDoItems[item.index].description = item.description || ''; 
        if (item.dueDate) {
            toDoItems[item.index].dueDate = item.dueDate;
        } 
        setToDoItems(toDoItems);
    }

    const submitNotes = () => {
        // Since we don't have a real API to make a POST call here we will store the data in local storage. 
        localStorage.setItem('toDoList', JSON.stringify(toDoItems));
    }

    return (
        <>
        <div className="container p-4 d-flex">
            <input type="text"
                onChange={(event) => setItemDescription(event.target.value)}
                value={itemDescription}
                className="form-control" />
            <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                minDate={new Date()}
                name="dueDate"
                dateFormat="MM/dd/yyyy"
            />
            <button onClick={AddNewItem} className="btn btn-primary add-btn">ADD</button>
        </div>
        <div className="container d-flex">
            <div className='col-4'>
                <span>Filter items by description</span>
            </div>
            <div className='col-8'>
                <input type="text"
                    onChange={(event) => setFilterValue(event.target.value)}
                    className="form-control" />
            </div>
        </div>
        <div className='container'>
            <div className='m-t-3'>
                {toDoItems.filter(item => item.description.toLowerCase().includes(filterValue.toLowerCase())).map((item, index) => {
                    return <ToDoItem key={index} item={item}
                        onChange={handleChange}
                        onClick={handleDelete} />
                })}
            </div>
        </div>
        <div className='container'>
            <button onClick={submitNotes} className="btn btn-primary">Submit</button>
        </div>
    </>
    );
}

export default ToDoList;