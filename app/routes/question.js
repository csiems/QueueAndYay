import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('question', params.question_id)
  },

  actions: {
    update(question, params) {
      var self = this;
      Object.keys(params).forEach(function(key) {
        if(params[key] !== undefined) {
          question.set(key, params[key]);
        }
      });
      question.save().then(function() {
        self.refresh();
      });
    },

    delete(question) {
      var self = this;
      question.destroyRecord().then(function() {
        self.transitionTo('index');
        self.refresh();
      });
    },

    saveAnswer(params) {
      var newAnswer = this.store.createRecord('answer', params);
      var question = params.question;
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('question', params.question);
    }


  }

});
