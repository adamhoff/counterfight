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
});

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {
  Meteor.publish('allItems', function() {
    return Items.find();
  });

  Meteor.methods({
    insertNewItem(itemOne, itemTwo) {
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
          if(position === 'itemOne') {
            Items.update(item._id, {
              $inc: {
                'itemOne.value': 1
              },
              $set: {
                lastUpdated
              }
            })
          } else {
            Items.update(item._id, {
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
    });
  }


export default Items;
