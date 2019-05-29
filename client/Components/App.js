// React imports
import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { checkIfUserLoggedInThunk } from '../store/auth/actions'

// For testing purposes only, remove as needed
import { getAllUsers } from '../store/users/actions'
import { getAllCohorts } from '../store/cohorts/actions'
import { getAllCategories } from '../store/categories/actions'

// React sub-components
// import { Home, Login, CodeEditor, AdminHomeView, SingleCohort } from './index'

class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()

    // For testing purposes only, remove as needed
    this.props.getUsers()
    this.props.getCategories()
    this.props.getCohorts()
  }

  render() {
    return <div>hi</div>

    return (
      <Router>
        <Switch>
          <Route path='/admin' exact component={AdminHomeView} />
          <Route path='/cohort/:id' exact component={SingleCohort} />
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/code' exact component={CodeEditor} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk()),

    // For testing purposes only, remove as needed
    getUsers: () => dispatch(getAllUsers()),
    getCohorts: () => dispatch(getAllCohorts()),
    getCategories: () => dispatch(getAllCategories())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
