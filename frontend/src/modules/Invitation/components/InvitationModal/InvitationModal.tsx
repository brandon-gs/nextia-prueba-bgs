import { Button, Modal, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { Invitation } from "../../Invitation.schema";
import InvitationQR from "../InvitationQR/InvitationQR";

interface IInvitationModalProps {
  open: boolean;
  onClose: () => void;
  invitation: Invitation | null;
}

const InvitationModal: FC<IInvitationModalProps> = ({
  open,
  onClose,
  invitation,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 3,
        }}
      >
        {invitation === null ? (
          <>
            <Typography>
              Ocurrió un error al mostrar el código QR, intentalo más tarde
            </Typography>
          </>
        ) : (
          <>
            <InvitationQR invitation={invitation} />
            <Typography>
              Escanea este código QR para ver los datos de la invitación
            </Typography>
          </>
        )}
        <Button variant="contained" onClick={onClose} fullWidth size="large">
          Cerrar
        </Button>
      </Paper>
    </Modal>
  );
};

export default InvitationModal;
