import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { closeDialog } from 'src/actions'
import { IState } from 'src/store'
import { Dialog } from 'src/store/dialog'
import ShapeEditor from './shape-editor'
import ProjectModal from './project-modal'

class DialogComponent extends React.Component<DialogComponent.IProps> {

  close = () => {
    this.props.close()
  }
  render() {
    const { visible, type } = this.props
    const shape = visible && type === 'new-shape'
    const project = visible && type === 'project'
    return (
      <React.Fragment>
        {shape && <ShapeEditor visible={ shape } close={ this.close } />}
        {project && <ProjectModal visible={ project } close={ this.close } />}
      </React.Fragment>
    )
  }
}

// state to props
const mapState = (state: IState) => {
  return {
    ...state.dialog,
  }
}
// actions
const mapDispatch = (dispatch: Dispatch) => {
  return {
    // close: () => {
    //   dispatch(closeDialog())
    // },
    // close: closeDialog,
    close: bindActionCreators(closeDialog, dispatch),
  }
}

export default connect(
  mapState,
  mapDispatch,
)(DialogComponent)

declare namespace DialogComponent {
  export interface IProps extends Dialog.IState {
    // dispatch: Dispatch,
    close(): void
  }
}
