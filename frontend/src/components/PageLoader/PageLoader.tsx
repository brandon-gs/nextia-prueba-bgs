import { Box, BoxProps, CircularProgress } from "@mui/material";
import React, { FC } from "react";

const PageLoader: FC<BoxProps> = ({ sx, ...boxProps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        ...sx,
      }}
      {...boxProps}
    >
      <CircularProgress size={200} />
    </Box>
  );
};

export default PageLoader;
