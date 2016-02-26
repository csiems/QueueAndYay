import Ember from 'ember';

export default Ember.Component.extend({
  updateFormShow: false,
  actions: {
    updateFormShow() {
      this.set('updateFormShow', true);
    },
    update(question) {
      var params = {
        content: this.get('content'),
        author: this.get('author'),
        notes: this.get('notes') ? this.get('notes') : ''
      };
      this.set('updateFormShow', false);
      this.sendAction('update', question, params);
    }
  }
});
