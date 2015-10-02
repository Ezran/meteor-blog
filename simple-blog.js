Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  
  Template.registerHelper("simpleDate", function (ts) {
    return moment(ts).fromNow();
  });
  
  Template.body.helpers({
    posts: function() {
      return Posts.find({}, {sort: {date: -1}});
    },
    checked: function() {
      return Session.get("checked");
    }
  });
  
  Template.body.events({
    "submit .newPost": function (event) {
      event.preventDefault();
      
      var t = event.target.title.value;
      var b = event.target.body.value;
      
      if (t == "" || b == "")
      {
        //throw invalid input errors 
      }
      else {
        Posts.insert({
          title: t,
          date: new Date(),
          body: b
        });
        
        event.target.title.value = "";
        event.target.body.value = "";
      }
    },
    "click .dropdownToggleLabel": function() {
      Session.set("checked",!Session.get("checked"));
    },
    "click .deletePost" : function () {
      //var target = Posts.findOne(this._id);
      Posts.remove(this._id);
    }
  });  
}
