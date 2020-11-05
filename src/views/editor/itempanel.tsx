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

    this.state = {
      filter: '',
      filterList: serializeItemList(props.shapeList, props.categoryList),
      openList: ['全部'],
    }
  }
  // props change
  componentDidUpdate(prev: ItemPanel.IProps) {
    if (this.props.shapeList !== prev.shapeList || this.props.categoryList !== prev.categoryList) {
      this.setState({
        filterList: serializeItemList(this.props.shapeList, this.props.categoryList),
      })
    }
  }
  updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    this.setState({
      filter: val,
      filterList: serializeItemList(this.props.shapeList, this.props.categoryList, val),
    })
  }
  // toggle category list
  toggleCategory = (category: string) => {
    const { openList } = this.state
    const i = openList.indexOf(category)
    if (i > -1) {
      this.setState({
        openList: [
          ...openList.slice(0, i),
          ...openList.slice(i + 1),
        ],
      })
    } else {
      this.setState({
        openList: [
          ...openList,
          category,
        ],
      })
    }
  }
  // serialize item list
  // open create shape dialog
  createShape = () => {
    this.props.dispatch({ type: OPEN_DIALOG, dialogType: 'new-shape' })
  }
  render() {
    const { filter, filterList, openList } = this.state
    return (
      <div id="editor-itempanel" className="editor-itempanel">
        <div className="search-box">
          <Input
            value={ filter }
            onChange={ this.updateFilter }
            placeholder="过滤图形"
            // size="small"
            allowClear
            addonAfter={
              <i className="new-btn iconfont icon-edit" onClick={ this.createShape }></i>
            }
            />
          {/* <span className="new-btn">
            <i className="iconfont icon-edit"></i>
          </span> */}
        </div>
        <div className="item-list-box">
          {
            Object.keys(filterList).map((c, i) => {
              const opened = openList.indexOf(c) > -1
              return (
                <Category list={ filterList[c] } cate={ c } key={ c + i } opened={ opened } toggle={ this.toggleCategory } />
              )
            })
          }
        </div>
      </div>
    )
  }
}

// category
function Category({
  list,
  cate,
  opened,
  toggle,
}: {
  list: Shapes.IShape[],
  cate: string,
  opened?: boolean,
  toggle(c: string): void,
}) {

  return (
    <div className={ `item-category ${opened ? 'open' : null}` }>
      <div className="item-category-title" onClick={ toggle.bind(null, cate) }><i className="iconfont icon-arrow-right"></i>{ cate }</div>
      <div className="item-list">
        {
          list.map(s => (
            <div className="shape-item" data-shape={ s.shape } key={ s.shape }>{ s.name }</div>
          ))
        }
      </div>
    </div>
  )
}


// serialize item list by category
function serializeItemList(shapes: Shapes.IShape[], category: string[], filter = '') {
  const filterList = filter.length ? shapes.filter(s => s.shape.indexOf(filter) > -1 || s.name.indexOf(filter) > -1) : shapes
  const tmp: {[c: string]: any} = {
    '全部': filterList,
  }
  category.forEach((c: string) => {
    tmp[c] = filterList.filter(s => s.category === c)
  })

  return tmp
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
    filterList: {
      [category: string]: Shapes.IShape[],
    },
    openList: string[],
  }
}

// export component
export default connect(
  mapState,
)(ItemPanel)
