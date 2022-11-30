import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 580,
  borderRadius: '10px',
};

export default function TransitionsModal(props) {
  // React.useEffect(() => {
  //   props.setTab({ customerTab: '', userTab: 'hidden', assignTab: '' });
  // }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="rounded border bg-light-important px-5 py-2.5 text-auto-white hover:bg-auto-black hover:text-auto-white"
        onClick={handleOpen}
      >
        Create
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableEnforceFocus
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{props.children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
