import React, { useState, useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const ToDoItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  
  useEffect(() => {
    setDescription(props.item.description);
    setDueDate(props.item.dueDate);
  }, [props.item.description, props.item.dueDate]);

  function handleDelete() {
    props.onClick(props.item.id);
  }

  function toggleEditMode(event) {
    if (event.keyCode === 13) {
      setEditMode(false);
    }
  }

  function handleDescriptionChange(event) {
      setDescription(event.target.value);
      props.onChange({ description: description, index: props.item.id });
  }

  function handleDateChange(date) {
    setDueDate(new Date(date));
    props.onChange({ description: description, dueDate: date, index: props.item.id });
  }
  return (
    <div className="item-wrapper">
      <div className="d-block">
        {editMode ?
          <>
            <div className="col-12 d-flex">
              <input type="text"
                onChange={handleDescriptionChange}
                onKeyDown={toggleEditMode}
                value={description}
                className="form-control" />
              <DatePicker
                selected={dueDate}
                onChange={handleDateChange}
                minDate={new Date()}
                onKeyDown={toggleEditMode}
                name="dueDate"
                dateFormat="MM/dd/yyyy" />
            </div>
          </>
          : <>
            <div><strong>Description:</strong><span> {props.item.description}</span></div>
            <div><strong>Due Date:</strong><span> {props.item.dueDate ? props.item.dueDate.toLocaleDateString() : ''}</span></div>
          </>
        }
      </div>
      <span onClick={() => setEditMode(!editMode)} className="fa fa-edit"></span>
      <span onClick={() => handleDelete()} className="fa fa-trash"></span>
    </div>
  );
}

export default ToDoItem;