import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      questions: this.store.findAll('question').then(function(questions) {
        return questions.sortBy('timestamp');
      }),
      answers: this.store.findAll('answer').then(function(answers) {
        return answers.sortBy('timestamp');
      }),
    })
  },

  actions: {
    save(params) {
      var self = this;
      var newQuestion = this.store.createRecord('question', params);
      newQuestion.save().then(function() {
        self.transitionTo('index');
        self.refresh();
      });
    },

    update(question, params) {
      var self = this;
      Object.keys(params).forEach(function(key) {
        if(params[key] !== undefined) {
          question.set(key, params[key]);
        }
      });
      question.save().then(function() {
        self.transitionTo('index');
        self.refresh();
      });
    },

    destroyQuestion(question) {
      var answer_deletions = question.get('answers').map(function(answer) {
        return answer.destroyRecord();
      });
      Ember.RSVP.all(answer_deletions)
         .then(function() {
         return question.destroyRecord();
      })
      this.transitionTo('index');
    }
  }
});
