import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';
import Items from '../api/Items';
import Item from './Item';

@autobind
class App extends Component {
  addItems(event) {
    event.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();

    if(itemOne !== '' && itemTwo !== '' && Meteor.user()){
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if (!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        }
      });
    }
  }
  showAll(){
    if(this.props.showAll) {
      Session.set('showAll', false);
    } else {
      Session.set('showAll', true);
    }
  }
  render() {
    return(
        <main>
            <button className='show-toggle' onClick={this.showAll}>
              Show {this.props.showAll ? 'One' : 'All'}
            </button>
            <span className='directions'>Sign in and add two items to start a vote</span>
            <form className='new-Items' onSubmit={this.addItems}>
              <input type='text' ref='itemOne' placeholder='Ex: Cats...'/>
              <span> vs </span>
              <input type='text' ref='itemTwo' placeholder='Ex: Dogs...'/>
              <button type='submit'>Add Items</button>
            </form>
          <ReactCSSTransitionGroup
            transitionName='item'
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
            transitionAppear={true}
            transitionAppearTimeout={600}>
          {this.props.items.map((item) => {
            return <Item item={item} key={item._id}/>
          })}
          </ReactCSSTransitionGroup>
        </main>
    );
  }
}

export default createContainer((params) => {
  let itemsSubscription = Meteor.subscribe('allItems');
  let userSubscription = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll')
  let itemsArray;
  if (params.id) {
    itemsArray = Items.find({_id: params.id}).fetch();
  }
  else {
    itemsArray = Items.find({}, {
      limit: showAll ? 50 : 1,
      sort:  showAll ? { createdAt: -1 } : { lastUpdated: 1}
    }).fetch()
  }
  return {
    showAll,
    ready: itemsSubscription.ready() && userSubscription.ready(),
    items: itemsArray,
    currentUser: Meteor.user()
  }
}, App);
