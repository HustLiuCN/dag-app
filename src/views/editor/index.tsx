import React from 'react'
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
import { addEdge, addNode, delEdge, delNode, updateNode } from 'src/actions/dag'
import { openDialog } from 'src/actions'
import { Projects } from 'src/store/project'

class EditorComponent extends React.Component<EditorComponent.IProps, EditorComponent.IState> {
  constructor(props: EditorComponent.IProps) {
    super(props)

    // TODO
    // this.editor = null
    this.state = {}
  }
  // dom mounted
  componentDidMount() {
    this.initEditor()
  }
  // TODO
  // init editor
  editor?: Editor
  initEditor = () => {
    const editor = new Editor({
      container: '#editor-container',
      itempanel: '#editor-itempanel',
      page: '#editor-page',
    })
    this.editor = editor
    this.registerShape()
    this.bind()
    this.setState({
      pageConfig: editor.pageConfig,
    })
    // force update
    this.forceUpdate()
  }
  componentDidUpdate(prev: EditorComponent.IProps) {
    const { dag, shapes } = this.props
    const { project } = dag
    // update shapes
    if (prev.shapes !== shapes) {
      this.registerShape()
    }
    // TODO
    if (prev.dag.project !== project) {
      this.updateProjectName()
    }
    if (prev.dag !== dag) {
      this.repaint()
    }
  }
  // update events
  updateProjectName = () => {
    const { dag, projects } = this.props
    const name = projects.find(p => p.id === dag.project)?.name
    this.setState({
      projectName: name,
    })
  }
  // register shapes
  registerShape = () => {
    for (let shape of this.props.shapes) {
      this.editor?.registerShape(shape.shape, shape)
    }
  }
  // register callback
  bind = () => {
    const { editor, editorDataChangeHandler: handler } = this
    editor?.on('nodeAdded', handler('addNode'))
    editor?.on('nodeDeleted', handler('delNode'))
    editor?.on('edgeAdded', handler('addEdge'))
    editor?.on('edgeDeleted', handler('delEdge'))
    editor?.on('selectedNodeChange', this.selectedNodeChange)
  }
  // node event
  editorDataChangeHandler = (fn: EditorComponent.EditorEvent) => {
    return this.props[fn]
  }
  selectedNodeChange = (node: Dag.INode) => {
    this.setState({
      selectedNodeId: node?.id,
      selectedNode: node && this.props.dag.nodes.find(n => n.id === node.id),
    })
  }
  updateSelectedNode = (node: Dag.INode) => {
    this.props.updateNode(node)
  }
  repaint = () => {
    const { nodes, edges } = this.props.dag
    this.editor?.setData({ nodes, edges })
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
    this.props.triggerProjectModal({
      saveType: t,
      dag: this.editor?.getData(),
    })
  }
  render() {
    const { activeMenu, dag } = this.props
    const { selectedNode, projectName, pageConfig } = this.state

    const panel = selectedNode
                  ?
                  (
                    <DetailPanel
                      selectedNode={ selectedNode }
                      update={ this.updateSelectedNode }
                      />
                  )
                  :
                  (
                    <CanvasPanel
                      project={ projectName }
                      dag={ dag }
                      config={ pageConfig }
                      onDownload={ this.download }
                      onSave={ this.save }
                      />
                  )

    return (
      <div className="editor-container" id="editor-container">
        <ItemPanel visible={ activeMenu === 'editor' } />
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
    shapes: state.shape.shapeList,
    dag: state.dag,
    projects: state.project.projectList,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    // node
    addNode: (node: Dag.INode) => dispatch(addNode(node)),
    delNode: (id: string) => dispatch(delNode(id)),
    updateNode: (n: Dag.INode) => dispatch(updateNode(n)),
    // edge
    addEdge: (e: Dag.IEdge) => dispatch(addEdge(e)),
    delEdge: (id: string) => dispatch(delEdge(id)),
    // open project modal
    triggerProjectModal: (args: any) => dispatch(openDialog('project', args)),
  }
}

declare namespace EditorComponent {
  export interface IProps {
    activeMenu: string,
    dag: Dag.IState,
    shapes: Shapes.IShape[],
    projects: Projects.IProject[],
    addNode(n: Dag.INode): void,
    updateNode(n: Dag.INode): void,
    delNode(id: string): void,
    addEdge(e: Dag.IEdge): void,
    delEdge(id: string): void,
    triggerProjectModal(args: any): void,
  }
  export interface IState {
    selectedNode?: Dag.INode,
    selectedNodeId?: string,
    pageConfig?: Editor.IPageConfig,
    projectName?: string,
  }
  export type EditorEvent = 'addNode' | 'updateNode' | 'delNode' | 'addEdge' | 'delEdge'
}

export default connect(
  mapSate,
  mapDispatch,
)(EditorComponent)
