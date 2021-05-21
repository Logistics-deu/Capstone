import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function Logout(){

  localStorage.clear();
  alert('로그아웃되었습니다.');
}

export default function Testgrid() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        로그아웃
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Logistics information"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           로그아웃 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={Logout} color="primary">
           네
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            아니요
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}