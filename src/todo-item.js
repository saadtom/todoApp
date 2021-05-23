import React, { Component, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode(event) {
    if (event.keyCode == 13) {
      this.setState({
        editMode: false
      })
    }
  }

  handleChange(event) {
    if (event.target) {
      this.props.onChange({ value: event.target.value, index: this.props.item.id });
    } else {
      this.props.onChange({ value: event, index: this.props.item.id });
    }
  }

  handleDelete() {
    this.props.onClick(this.props.item.id);
  }

  render() {
    return (
      <div className="item-wrapper">
        <div className="d-block">
          {this.state.editMode ?
            <>
              <div className="col-12 d-flex">
                <input type="text"
                  onChange={this.handleChange}
                  onKeyDown={this.toggleEditMode}
                  value={this.props.item.description}
                  className="form-control" />
                <DatePicker
                  selected={this.props.item.dueDate}
                  onChange={this.handleChange}
                  onKeyDown={this.toggleEditMode}
                  name="dueDate"
                  dateFormat="MM/dd/yyyy" />
              </div>
            </>
            : <>
              <div><strong>Description:</strong><span>{this.props.item.description}</span></div>
              <div><strong>Due Date:</strong><span>{this.props.item.dueDate.toLocaleDateString()}</span></div>
            </>
          }
        </div>
        <span onClick={() => this.setState({ editMode: !this.state.editMode })} className="fa fa-edit"></span>
        <span onClick={this.handleDelete} className="fa fa-trash"></span>
      </div>
    );
  }
}

export default ToDoItem;