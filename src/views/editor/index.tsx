import * as React from 'react';
import { Editor } from 'simple-dag-editor'
import ItemPanel from './editor-itempanel'

import shapes from '../../lib/shape'

export default class EditorComponent extends React.Component<any> {
  // constructor(props: any) {
  //   super(props)
  // }
  componentDidMount() {
    const editor = new Editor({
      container: '#editor-container',
      itempanel: '#editor-itempanel',
      page: '#editor-page',
    })
    // console.log(editor)
    for (let shape of shapes) {
      editor.registerShape(shape.shape, shape)
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
