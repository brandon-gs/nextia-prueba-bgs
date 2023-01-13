import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { FC, useEffect, useState } from "react";
import InvitationQR from "../InvitationQR/InvitationQR";
import { useGetInvitationByIdQuery } from "../../Invitation.api";
import PageLoader from "../../../../components/PageLoader/PageLoader";
import { formatDateToReadable, getLocalDate } from "../../../../dates";
import { isAfter } from "date-fns";
import clsx from "clsx";
import { useRouter } from "next/router";

interface InvitationDetailsProps {
  id: string;
}

const InvitationDetails: FC<InvitationDetailsProps> = ({ id }) => {
  const router = useRouter();
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

  if (error && "status" in error && error.status === 403) {
    return (
      <Paper sx={{ width: "100%", height: 440, overflow: "hidden", p: 5 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ height: "100%" }}
          rowGap={2}
        >
          <Grid item>
            <LockIcon sx={{ fontSize: 160 }} />
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h4" align="center">
              No tienes permisos para ver está invitación
            </Typography>
          </Grid>
          <Grid
            item
            width="100%"
            sx={{ display: "grid", placeItems: "center" }}
          >
            <Button
              variant="contained"
              sx={{ maxWidth: 500, width: "100%" }}
              size="large"
              onClick={() => router.push("/invitation")}
            >
              Ver mis invitaciones
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  if (!data) {
    return <PageLoader />;
  }

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
