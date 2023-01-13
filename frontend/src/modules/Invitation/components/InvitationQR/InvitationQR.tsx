import QRCode from "qrcode.react";
import React, { FC, useEffect, useState } from "react";
import { Invitation } from "../../Invitation.schema";
import { formatDateToReadable, getLocalDate } from "../../../../dates";
import { isAfter } from "date-fns";

interface InvitationQRProps {
  invitation: Invitation;
}

const InvitationQR: FC<InvitationQRProps> = ({ invitation }) => {
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
    <>
      <QRCode value={formatedInvitation} size={240} />
    </>
  );
};

export default InvitationQR;
