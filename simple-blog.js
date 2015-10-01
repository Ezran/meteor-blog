Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Template.body.helpers({
    posts: function() {
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  });
  
  Template.body.events({
    "submit .new-post": function (event) {
      event.preventDefault();
      
      Posts.insert({
        title: event.target.title.value,
        date: new Date(),
        body: event.target.body.value
      });
      
      event.target.title.value = "";
      event.target.body.value = "";
    }
  });
  
}
