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

    if(itemOne !== '' && itemTwo !== ''){
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
    if (!this.props.ready) {
      return <div>Loading</div>;
    }

    return(
        <main>
          <IsRole role='admin' {...this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'One' : 'All'}
            </button>
          </IsRole>
          <IsRole role='admin'>
            <form className='new-Items' onSubmit={this.addItems}>
              <input type='text' ref='itemOne' />
              <input type='text' ref='itemTwo' />
              <button type='submit'>Add Items</button>
            </form>
          </IsRole>
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
      sort: { lastUpdated: 1 }
    }).fetch()
  }
  return {
    showAll,
    ready: itemsSubscription.ready() && userSubscription.ready(),
    items: itemsArray
  }
}, App);