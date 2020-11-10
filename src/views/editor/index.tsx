import * as React from 'react'
import { Editor } from 'simple-dag-editor'
import ItemPanel from './itempanel'
import DetailPanel from './node-panel'
import CanvasPanel from './canvas-panel'
import DownloadModal from '../dialog/download-modal'

import { IState } from 'src/store'
import { connect } from 'react-redux'
import { Shapes } from 'src/store/shape'
import { Dag } from 'src/store/dag'
import { Dispatch } from 'redux'
import { addNode, delNode } from 'src/actions/dag'
import { openDialog } from 'src/actions'

class EditorComponent extends React.Component<EditorComponent.IProps, EditorComponent.IState> {
  constructor(props: EditorComponent.IProps) {
    super(props)

    // TODO
    this.editor = null
    this.state = {
      pageConfig: {},
    }
  }
  // dom mounted
  componentDidMount() {
    this.initEditor()
  }
  // TODO
  // init editor
  editor: Editor | null
  initEditor = () => {
    const editor = new Editor({
      container: '#editor-container',
      itempanel: '#editor-itempanel',
      page: '#editor-page',
    })
    this.editor = editor
    this.registerShape()
    this.bind()
  }
  componentDidUpdate(prev: EditorComponent.IProps) {
    if (prev.shape.shapeList !== this.props.shape.shapeList) {
      this.registerShape()
    }
    // TODO
    // if (prev.activeMenu !== this.props.activeMenu && this.props.activeMenu === 'editor') {
    //   this.initEditor()
    // }
  }
  // register shapes
  registerShape = () => {
    for (let shape of this.props.shape.shapeList) {
      this.editor?.registerShape(shape.shape, shape)
    }
  }
  // register callback
  bind = () => {
    const { editor } = this
    editor?.on('nodeAdded', this.addNode)
    editor?.on('nodeDeleted', this.delNode)
    editor?.on('selectedNodeChange', this.selectedNodeChange)
  }
  // node event
  addNode = (node: Dag.INode) => {
    this.props.addNode(node)
  }
  delNode = (id: string) => {
    this.props.delNode(id)
  }
  selectedNodeChange = (node: Dag.INode) => {
    this.setState({
      selectedNodeId: node?.id,
      selectedNode: node && this.props.dag.nodes[node.id],
    })
  }
  // canvas event
  download = () => {
    DownloadModal({
      // TODO default title
      callback: (n: string, t: string) => {
        return this.editor?.saveFile(n, t)
      },
    })
  }
  save = (t: string) => {
    this.props.saveProject({
      saveType: t,
      dag: this.editor?.getData(),
    })
  }
  render() {
    const { activeMenu } = this.props
    const { selectedNode } = this.state

    const panel = selectedNode
                  ?
                  (<DetailPanel selectedNode={ selectedNode } />)
                  :
                  (<CanvasPanel onDownload={ this.download } onSave={ this.save } />)

    return (
      <div className="editor-container" id="editor-container">
        { activeMenu === 'editor' && <ItemPanel /> }
        <div className="editor-page" id="editor-page"></div>
        {
          activeMenu === 'editor'
          &&
          (
            <div id="editor-detailpanel" className="editor-detailpanel">
              { panel }
            </div>
          )
        }
      </div>
    )
  }
}

const mapSate = (state: IState) => {
  return {
    activeMenu: state.menu.activeMenu,
    shape: state.shape,
    dag: state.dag,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    addNode: (node: Dag.INode) => dispatch(addNode(node)),
    delNode: (id: string) => dispatch(delNode(id)),
    saveProject: (args: any) => dispatch(openDialog('project', args)),
  }
}

declare namespace EditorComponent {
  export interface IProps {
    activeMenu: string,
    shape: Shapes.IState,
    dag: Dag.IState,
    addNode(n: Dag.INode): void,
    delNode(id: string): void,
    saveProject(args: any): void,
  }
  export interface IState {
    selectedNode?: Dag.INode,
    selectedNodeId?: string,
    pageConfig: any,
  }
}

export default connect(
  mapSate,
  mapDispatch,
)(EditorComponent)
