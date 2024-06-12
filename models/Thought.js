const { Schema, model, Types } = require('mongoose');
const moment = require('moment'); // Ensure moment is imported if you're using it for date formatting

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtTitle: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'Thought title',
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      default: 'What are your thoughts?',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;