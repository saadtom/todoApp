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
    // this.setState({
    //   itemDescription: event.target.value
    // })
  }

  render() {
    return (
      <div className="item-wrapper" key={this.props.id}>
        <div className="d-block">
          {this.state.editMode ?
            <>
              <div className="col-12 d-flex">
                <input type="text"
                  onChange={this.handleItemChange}
                  value={this.props.item.description}
                  className="form-control" />
                   <DatePicker
                selected={this.props.item.dueDate}
                onChange={this.handleDateChange}
                name="dueDate"
                dateFormat="MM/dd/yyyy" />
              </div>
            </>
            : <>
              <div><strong>Description:</strong> <span>{this.props.item.description}</span></div>
              <div><strong>Due Date:</strong> <span>{this.props.item.dueDate.toLocaleDateString()}</span></div>
            </>
          }
        </div>
        <span onClick={() => this.setState({ editMode: !this.state.editMode })} className="fa fa-edit"></span>
        <span onClick={() => this.deleteItem(this.props.item.id)} className="fa fa-trash"></span>
      </div>
    );
  }
}

export default ToDoItem;