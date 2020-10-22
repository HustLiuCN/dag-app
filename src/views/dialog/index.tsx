import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { closeDialog } from 'src/actions'
import { IState } from 'src/store'
import { Dialog } from 'src/store/dialog'
import ShapeEditor from './shape-editor'

class DialogComponent extends React.Component<DialogComponent.IProps> {

  close = () => {
    console.log('dispatch')
    this.props.close()
  }
  render() {
    console.log(this.props)
    const { visible } = this.props
    return (
      <React.Fragment>
        {visible && <ShapeEditor close={ this.close } visible={ this.props.visible } />}
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
