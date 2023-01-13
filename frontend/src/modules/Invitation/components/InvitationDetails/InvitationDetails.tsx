import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import InvitationQR from "../InvitationQR/InvitationQR";
import { useGetInvitationByIdQuery } from "../../Invitation.api";
import PageLoader from "../../../../components/PageLoader/PageLoader";
import { formatDateToReadable, getLocalDate } from "../../../../dates";
import { isAfter } from "date-fns";
import clsx from "clsx";

interface InvitationDetailsProps {
  id: string;
}

const InvitationDetails: FC<InvitationDetailsProps> = ({ id }) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { isLoading, isFetching, data, error } = useGetInvitationByIdQuery({
    id,
  });

  useEffect(() => {
    if (data && data.invitation) {
      const endDate = getLocalDate(data.invitation.endDate);
      const expired = isAfter(new Date(), endDate);
      setIsExpired(expired);
    }
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageLoader />;
  }

  console.log(data);

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Card
        sx={{
          p: 4,
          pb: 2,
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InvitationQR invitation={data.invitation} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {data.invitation.guestName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDateToReadable(data.invitation.startDate)}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            -
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            {formatDateToReadable(data.invitation.endDate)}
          </Typography>
          <Typography
            variant="subtitle2"
            color={clsx(isExpired && "red", !isExpired && "green")}
            align="center"
          >
            {isExpired ? "La invitación expiró" : "La invitación es válida"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InvitationDetails;
