const db = require('../db')

const Comment = db.define('comment', {
  body: {
    type: db.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Comment
