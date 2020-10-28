import * as React from 'react';
import { Editor } from 'simple-dag-editor'
import ItemPanel from './itempanel'
import DetailPanel from './detailpanel'

import { IState } from 'src/store';
import { connect } from 'react-redux';
import { Shapes } from 'src/store/shape';

class EditorComponent extends React.Component<EditorComponent.IProps> {
  // constructor(props: EditorComponent.IProps) {
  //   super(props)
  // }
  initEditor() {
    const editor = new Editor({
      container: '#editor-container',
      itempanel: '#editor-itempanel',
      page: '#editor-page',
    })
    this.editor = editor
    for (let shape of this.props.shape.shapeList) {
      this.editor.registerShape(shape.shape, shape)
    }
  }
  componentDidMount() {
    this.initEditor()
  }
  editor?: Editor
  componentDidUpdate(prev: EditorComponent.IProps) {
    if (prev.shape.shapeList !== this.props.shape.shapeList) {
      if (!this.editor) {
        return
      }
      for (let shape of this.props.shape.shapeList) {
        this.editor.registerShape(shape.shape, shape)
      }
    }
    if (prev.activeMenu !== this.props.activeMenu && this.props.activeMenu === 'editor') {
      this.initEditor()
    }
  }
  render() {
    const { activeMenu } = this.props
    return (
      <div className="editor-container" id="editor-container">
        { activeMenu === 'editor' && <ItemPanel /> }
        <div className="editor-page" id="editor-page"></div>
        { activeMenu === 'editor' && <DetailPanel /> }
      </div>
    )
  }
}

const mapSate = (state: IState) => {
  return {
    activeMenu: state.menu.activeMenu,
    shape: state.shape,
  }
}

declare namespace EditorComponent {
  export interface IProps {
    activeMenu: string,
    shape: Shapes.IState,
  }
}

export default connect(
  mapSate,
)(EditorComponent)
