import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    update(answer, params) {
      this.sendAction('update', answer, params);
    },

    delete(answer) {
      this.sendAction('destroyAnswer', answer);
    }
  }
});
