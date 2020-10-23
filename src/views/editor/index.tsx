import * as React from 'react';
import { Editor } from 'simple-dag-editor'
import ItemPanel from './editor-itempanel'

import { IState } from 'src/store';
import { connect } from 'react-redux';
import { Shapes } from 'src/store/shape';

class EditorComponent extends React.Component<EditorComponent.IProps> {
  // constructor(props: EditorComponent.IProps) {
  //   super(props)
  // }
  componentDidMount() {
    const editor = new Editor({
      container: '#editor-container',
      itempanel: '#editor-itempanel',
      page: '#editor-page',
    })
    this.editor = editor
    // console.log(editor)
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
  }
  render() {
    return (
      <div className="editor-container" id="editor-container">
        <ItemPanel />
        <div className="editor-page" id="editor-page"></div>
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
