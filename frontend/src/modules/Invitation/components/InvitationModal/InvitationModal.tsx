import { Button, Modal, Paper, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Invitation } from "../../Invitation.schema";
import QRCode from "qrcode.react";
import { formatDateToReadable, getLocalDate } from "../../../../dates";
import { isAfter } from "date-fns";

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
  const [formatedInvitation, setFormatedInvitation] = useState("");

  useEffect(() => {
    if (!invitation) return;
    const endDate = getLocalDate(invitation.endDate);
    const expired = isAfter(new Date(), endDate)
      ? "Estado:  EXPIRÓ"
      : "Estado:  VÁLIDA";
    const formated = `${expired}
Invitado:   ${invitation.guestName}
Fecha de inicio:    ${formatDateToReadable(invitation.startDate)}
Fecha de finalización:  ${formatDateToReadable(invitation.endDate)}

        `;
    setFormatedInvitation(formated);
  }, [invitation]);

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
            <QRCode value={formatedInvitation} size={240} />
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
