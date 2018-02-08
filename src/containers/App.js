import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Advice from '../components/Advice'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = (props) => (
  <div>
    <Header addTodo={props.actions.addTodo} tip={props.tip} />
    <MainSection todos={props.todos} actions={props.actions} />
    {/* <Advice tip={props.tip} /> */}
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos,
  tip: state.tutorial.tip
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
