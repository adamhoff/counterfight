import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import Items from '../api/Items';
import { autobind } from 'core-decorators';

@autobind
export default class Item extends Component {

  voteOne() {
    Meteor.call('voteOnItem', this.props.item, 'itemOne');
  }
  voteTwo() {
    Meteor.call('voteOnItem', this.props.item, 'itemTwo');
  }
  removeItem() {
    Meteor.call('deleteItem', this.props.item);
  }
  render() {
    return(
        <div className='item'>
          <span>{this.props.item.username}</span>
          <div className='vote-one' onClick={this.voteOne}>
            <span>{this.props.item.itemOne.value}</span>
            <h3>{this.props.item.itemOne.text}</h3>
          </div>
          <span>vs</span>
          <div className='vote-two' onClick={this.voteTwo}>
            <span>{this.props.item.itemTwo.value}</span>
            <h3>{this.props.item.itemTwo.text}</h3>
          </div>
          <button className='delete' onClick={this.removeItem}>&times;</button>
        </div>
    )
  }
}
