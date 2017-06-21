import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

const ItemSchema = new SimpleSchema({
  text: String,
  value: SimpleSchema.Integer,
})

const ItemsSchema = new SimpleSchema({
  itemOne: ItemSchema,
  itemTwo: ItemSchema,
  lastUpdated: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date
  },
  owner: String,
  username: String,
  category: String,
  voters: {
    type: Array
  }
});

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {
  Meteor.publish('allItems', function() {
    return Items.find();
  });

  Meteor.methods({
    insertNewItem(itemOne, itemTwo, cat) {
      if(Meteor.userId()) {
      Items.insert({
        itemOne: {
          text: itemOne,
          value: 0,
        },
        itemTwo: {
          text: itemTwo,
          value: 0,
        },
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        category: cat,
        voters: []
      });
    }
  },
    deleteItem(item){
      if(Meteor.userId() === item.owner){
        Items.remove(item._id)
      }
    },

    voteOnItem(item, position) {
        let lastUpdated = new Date();
        if(Meteor.userId()) {
          if (_.include(item.voters, this.userId)){
            throw new Meteor.Error('invalid', 'Already voted');
          }else {
              if(position === 'itemOne') {
                Items.update(item._id, {
                  $push: {
                    voters: this.userId
                  },
                  $inc: {
                    'itemOne.value': 1
                  },
                  $set: {
                    lastUpdated
                  }
                })
              } else {
                Items.update(item._id, {
                  $push: {
                    voters: this.userId
                  },
                  $inc: {
                    'itemTwo.value': 1
                  },
                  $set: {
                    lastUpdated
                  }
                })
              }
            }
        }
      },
    });
  }


export default Items;
