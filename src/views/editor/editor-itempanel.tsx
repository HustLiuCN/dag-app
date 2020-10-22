import * as React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { Dispatch } from 'redux'

import { IState } from 'src/store'
import { Shapes } from 'src/store/shape'
import { OPEN_DIALOG } from 'src/actions'


class ItemPanel extends React.Component<ItemPanel.IProps, ItemPanel.IState> {
  constructor(props: ItemPanel.IProps) {
    super(props)
    console.log(props)

    this.state = {
      filter: '',
    }
  }
  updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    this.setState({
      filter: val,
    })
  }
  createShape = () => {
    this.props.dispatch({ type: OPEN_DIALOG })
  }
  render() {
    const { filter } = this.state
    return (
      <div id="editor-itempanel" className="editor-itempanel">
        <div className="search-box">
          <Input
            value={ filter }
            onChange={ this.updateFilter }
            placeholder="过滤图形"
            // size="small"
            allowClear={ true }
            addonAfter={
              <i className="new-btn iconfont icon-edit" onClick={ this.createShape }></i>
            }
            />
          {/* <span className="new-btn">
            <i className="iconfont icon-edit"></i>
          </span> */}
        </div>
        <div className="item-list"></div>
      </div>
    )
  }
}

// state to props
const mapState = (state: IState) => {
  const { shape } = state
  return {
    ...shape,
  }
}
// interface
export declare namespace ItemPanel {
  export interface IProps extends Shapes.IState {
    dispatch: Dispatch,
  }
  export interface IState {
    filter: string,
  }
}

// export component
export default connect(
  mapState,
)(ItemPanel)
