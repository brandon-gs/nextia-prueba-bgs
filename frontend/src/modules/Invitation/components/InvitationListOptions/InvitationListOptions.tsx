import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FeedIcon from "@mui/icons-material/Feed";
import PreviewIcon from "@mui/icons-material/Preview";
import { useRouter } from "next/router";
import { StyledMenu } from "../../../../components/NavigationTabs/NavigationTabs";
import { Delete } from "@mui/icons-material";
import { Invitation } from "../../Invitation.schema";
import { Divider } from "@mui/material";

interface InvitationListOptionsProps {
  onDelete: (id: string) => void;
  onView: (invitation: Invitation) => void;
  invitation: Invitation;
}

export default function InvitationListOptions({
  invitation,
  onDelete,
  onView,
}: InvitationListOptionsProps) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        color="secondary"
      >
        Opciones
      </Button>
      <StyledMenu
        id="table-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          disableRipple
          onClick={() => router.push(`/invitation/view/${invitation._id}`)}
        >
          <PreviewIcon />
          Ver detalle
        </MenuItem>
        <MenuItem disableRipple onClick={() => onView(invitation)}>
          <QrCodeScannerIcon />
          Ver código QR
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple onClick={() => onDelete(invitation._id)}>
          <Delete />
          Eliminar
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
