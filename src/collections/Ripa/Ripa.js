import React, { PropTypes } from 'react'
import './style.scss'

import {
  META,
} from '../../lib'

/**
 * Ripa is a control that lets you switch tabs
 */
export default class Ripa extends React.Component {
  static propTypes = {
    /** Collection of tab objects */
    labels: PropTypes.arrayOf(
      React.PropTypes.shape({
        k: React.PropTypes.string,
        v: React.PropTypes.string
      })
    ),

    /** Title of the switch */
    title: PropTypes.string,

    /**
     * Called on tab change.
     *
     * @param {string} k - Newly selected tab's key
     * @param {string} v - Newly selected tab's value
     * @param {number} index - Newly selected tab's index
     */
    onChange: PropTypes.func,

    /** Index of the tab that will be selected on load */
    initialSelectedIndex: PropTypes.number,

    /** Key of the tab that will be selected on load */
    initialSelectedKey: PropTypes.string,
  }

  static _meta = {
    name: 'Ripa',
    type: META.TYPES.COLLECTION,
  }

  static defaultProps = {
    onChange: () => {},
  }

  componentWillMount() {
    if (
      this.props.hasOwnProperty('initialSelectedIndex') &&
      this.props.hasOwnProperty('initialSelectedKey')
    ) { console.warn('Both initialSelectedIndex and initialSelectedKey were supplied. Using initialSelectedIndex.') }

    const { initialSelectedKey, initialSelectedIndex, labels } = this.props
    const selectedIndex = initialSelectedIndex || labels.findIndex(l => l.k === initialSelectedKey)
    this.state = { selectedIndex }
  }

  setSelected({k, v, index}) {
    const { selectedIndex } = this.state
    if (selectedIndex !== index) {
      this.setState({selectedIndex: index})
      this.props.onChange(k, v, index)
    }
  }

  _onClickButton = ({k, v, index}) => () => {
    this.setSelected({k, v, index})
  }

  render() {
    const {
      labels,
      title,
    } = this.props

    const { selectedIndex } = this.state

    const tabs = labels.map(({k, v}, index) => (
      <button
        className={`tab ${selectedIndex === index ? 'active' : null}`}
        key={`${k}-tab`}
        onClick={this._onClickButton({k, v, index})}
      >
        {v}
      </button>
    ))

    return (
      <div className='ripa'>
        <h1>{title}</h1>
        {tabs}
      </div>
    )
  }
}
