import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function ToDoItem(props) {
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    props.onClick(props.item.id);
  }

  function toggleEditMode(event) {
    if (event.keyCode === 13) {
      setEditMode(false);
    }
  }

  function handleChange(event) {
    if (event.target) {
      props.onChange({ value: event.target.value, index: props.item.id });
    } else {
      props.onChange({ value: event, index: props.item.id });
    }
  }

  return (
    <div className="item-wrapper">
      <div className="d-block">
        {editMode ?
          <>
            <div className="col-12 d-flex">
              <input type="text"
                onChange={handleChange}
                onKeyDown={toggleEditMode}
                value={props.item.description}
                className="form-control" />
              <DatePicker
                selected={props.item.dueDate}
                onChange={handleChange}
                minDate={new Date()}
                onKeyDown={toggleEditMode}
                name="dueDate"
                dateFormat="MM/dd/yyyy" />
            </div>
          </>
          : <>
            <div><strong>Description:</strong><span> {props.item.description}</span></div>
            <div><strong>Due Date:</strong><span> {props.item.dueDate.toLocaleDateString()}</span></div>
          </>
        }
      </div>
      <span onClick={() => setEditMode(!editMode)} className="fa fa-edit"></span>
      <span onClick={() => handleDelete()} className="fa fa-trash"></span>
    </div>
  );
}

export default ToDoItem;