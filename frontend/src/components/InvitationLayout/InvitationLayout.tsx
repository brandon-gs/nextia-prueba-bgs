import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { FC, PropsWithChildren } from "react";
import NavigationTabs from "../NavigationTabs/NavigationTabs";

const InvitationLayout: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => {
  return (
    <Container sx={{ height: "100%", py: 5 }}>
      <Grid container>
        <Grid item xs>
          <Typography component="h1" variant="h4" sx={{ pb: 4 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <NavigationTabs />
          </Grid>
        </Grid>
      </Grid>
      {children}
    </Container>
  );
};

export default InvitationLayout;
