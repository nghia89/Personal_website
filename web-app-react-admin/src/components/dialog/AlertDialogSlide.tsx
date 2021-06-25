import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles } from '@material-ui/core';


interface IProps {
  isOpen: boolean,
  handleClose: Function,
  handleConfirm: Function,
  note?: string,
  outClose?: boolean,
  title?: string,
  children?: React.ReactNode;
  width?: '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%'
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function AlertDialogSlide(props: IProps) {
  const useStyles = makeStyles(theme => ({
    dialogPaper: {
      top: '-150px',
      width: props.width ? props.width : '30%'
    },
  }));
  const classes = useStyles();
  let { isOpen, note, handleClose, handleConfirm, outClose, title } = props;
  return (
    <Dialog
      TransitionComponent={Transition}
      classes={{ paper: classes.dialogPaper }}
      open={isOpen}
      onClose={outClose ? handleClose() : null}
      aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">{title ? title : 'Thông báo'}</DialogTitle>
      <DialogContent>
        <div style={{ overflowY: 'hidden', flex: 'auto' }}>
          {note}
          {props.children}
        </div>

      </DialogContent>
      <DialogActions className="mt-2 mb-2">
        <button onClick={() => handleConfirm()} type="button" className="btn btn-primary">
          Xác nhận
        </button >
        <button onClick={() => handleClose()} type="button" className="btn btn-danger">
          Đóng
        </button >
      </DialogActions>
    </Dialog>
  );
}
