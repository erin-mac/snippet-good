const db = require('./db')
const {
  StretchAnswer,
  Comment,
  Cohort,
  Category,
  CohortUser,
  User,
  Stretch,
  CohortStretch
} = require('./models')

const {
  CohortStretchMethods,
  UserMethods,
  StretchMethods,
  CohortMethods,
  StretchAnswerMethods,
  CommentMethods
} = require('./methods')

function initDb(force = false) {
  return db.authenticate().then(() => {
    // Sequelize associations
    // --------------------------

    // Many-to-Many between User and Cohort
    CohortUser.belongsTo(Cohort)
    Cohort.hasMany(CohortUser)
    CohortUser.belongsTo(User)
    User.hasMany(CohortUser)

    // Comment belongs to User
    Comment.belongsTo(User)
    User.hasMany(Comment)

    // StretchAnswer belongs to CohortUser
    StretchAnswer.belongsTo(CohortUser)
    CohortUser.hasMany(StretchAnswer)

    // Stretch belongs to User
    Stretch.belongsTo(User, { as: 'author' })
    User.hasMany(Stretch, { foreignKey: 'authorId' })

    // CohortStretch belongs to Cohort
    CohortStretch.belongsTo(Cohort)
    Cohort.hasMany(CohortStretch)

    // CohortStretch belongs to Stretch
    CohortStretch.belongsTo(Stretch)
    Stretch.hasMany(CohortStretch)

    // Stretch belongs to Category
    Stretch.belongsTo(Category)
    Category.hasMany(Stretch)

    //StretchAnswer belongs to Stretch
    StretchAnswer.belongsTo(Stretch)
    Stretch.hasMany(StretchAnswer)

    //Comment belongs to StretchAnswer
    Comment.belongsTo(StretchAnswer)
    StretchAnswer.hasMany(Comment)

    return db.sync({ force })
  })
}

User.getStudentsOfSingleAdmin = UserMethods.getStudentsOfSingleAdmin

CohortStretch.getAllCohortStretches = CohortStretchMethods.getAllCohortStretches
Cohort.getCohortsOfSingleAdmin = CohortMethods.getCohortsOfSingleAdmin
StretchAnswer.getAnswersOfStudentsOfSingleAdmin =
  StretchAnswerMethods.getAnswersOfStudentsOfSingleAdmin
Comment.getCommentsOfStretchAnswer = CommentMethods.getCommentsOfStretchAnswer
Comment.createNewComment = CommentMethods.createNewComment

// Leaving this here in case of future errors.
// Stretch.getAllStretches = StretchMethods.getAllStretches

module.exports = {
  initDb,
  models: {
    StretchAnswer,
    Comment,
    Cohort,
    Category,
    CohortUser,
    CohortStretch,
    User,
    Stretch
  }
}
