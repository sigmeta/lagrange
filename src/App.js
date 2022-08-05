import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mssg: 'Dashboard',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    mssg: PropTypes.string,
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            {this.state.mssg}
            <Route
              path="*"
              name="Home"
              element={<DefaultLayout mssg={this.state.mssg} handleClick={this.handleClick} />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }

  handleClick = () => {
    this.setState({ mssg: 'Hi there!' })
    console.log(this.state.mssg)
  }
}

export default App
