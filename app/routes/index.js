import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
    posts: this.store.findAll('post'),
    comments: this.store.findAll('comment')
  });
  },
  actions: {
    save3(params) {
      var newPost = this.store.createRecord('post', params);
      newPost.save();
      this.transitionTo('index');
    },
    update(post, params) {
          Object.keys(params).forEach(function(key) {
            if(params[key]!==undefined) {
              post.set(key,params[key]);
            }
          });
          post.save();
          this.transitionTo('index');
        },
    destroyPost(post) {
      var comment_deletions = post.get('comments').map(function(comment){
        return comment.destroyRecord();
      });
      Ember.RSVP.all(comment_deletions).then(function() {
        return post.destroyRecord();
      });
      this.transitionTo('index');
    }
  }
});
