import * as React from 'react';
import { Editor } from 'simple-dag-editor'
import { ItemPanel } from './itempanel'

export class EditorComponent extends React.Component<any> {
  // constructor(props: any) {
  //   super(props)
  // }
  componentDidMount() {
    const editor = new Editor({
      container: '#container',
      itempanel: '#item-panel',
      page: '#page',
    })
    console.log(editor)
  }
  render() {
    return (
      <div className="main">
        <div className="container" id="container">
          <ItemPanel />
          <div id="page"></div>
        </div>
      </div>
    )
  }
}