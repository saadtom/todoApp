import React, { Component, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
    };
    // this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleItemChange = this.handleItemChange.bind(this);
    // this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  // handleDateChange(date) {
  //     this.setState({
  //         dueDate: date
  //     })
  // }

  handleItemChange(event) {
    this.setState({
      itemDescription: event.target.value
    })
  }

  render() {
    return (
      <div className="item-wrapper" key={this.props.id}>
        <div className="d-block">
          {this.state.editMode ?
            <><input type="text"
            onChange={this.handleItemChange}
            value={this.state.itemDescription}
            className="form-control" /></>
            : <><strong>Description:</strong> <span>{this.props.item.description}</span> </>}
          <span onClick={() => this.setState({ editMode: !this.state.editMode })} className="fa fa-edit"></span>
          <span onClick={() => this.deleteItem(this.props.item.id)} className="fa fa-trash"></span>
        </div>
        <div className="d-block">
        {this.state.editMode ?
            <><DatePicker
            selected={this.state.dueDate}
            onChange={this.handleDateChange}
            name="dueDate"
            dateFormat="MM/dd/yyyy"
        /></>
            : <><strong>Due Date:</strong> <span>{this.props.item.dueDate.toLocaleDateString()}</span></>}
        </div>

      </div>
    );

  }
}

export default ToDoItem;