import Ember from 'ember';

export default Ember.Component.extend({
  updatePostForm: false,
  actions: {
    updatePostForm() {
      this.set('updatePostForm', true);
    },
    update(post) {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        image: this.get('image'),
        category: this.get('category'),
      };
      this.set('updatePostForm', false);
      this.sendAction('update', post, params);
    }
  }
});
