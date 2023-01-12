import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  useDeleteInvitationMutation,
  useGetUserInvitationsQuery,
} from "../../Invitation.api";
import { useState } from "react";
import { Invitation } from "../../Invitation.schema";
import RefreshIcon from "@mui/icons-material/Refresh";
import Skeleton from "@mui/material/Skeleton";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: keyof Invitation;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "guestName", label: "Nombre", minWidth: 170 },
  { id: "startDate", label: "Fecha de inicio", minWidth: 170 },
  {
    id: "endDate",
    label: "Fecha de finalización",
    minWidth: 170,
    // format: (value: number) => value.toLocaleString("en-US"),
  },
];

const InvitationList = () => {
  const [idToDelte, setIdToDelete] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<number>(0);

  const { isLoading, isFetching, data, error, refetch } =
    useGetUserInvitationsQuery({
      limit: 5,
      page,
    });

  const [deleteInvitation, deleteInvitationStatus] =
    useDeleteInvitationMutation();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onDelete = (id: string) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteInvitation({ id: idToDelte });
    await refetch();
    setShowModal(false);
  };

  if (error && !data) {
    return (
      <Paper sx={{ width: "100%", height: 440, overflow: "hidden", p: 5 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ height: "100%" }}
          rowGap={5}
        >
          <Grid item>
            <Typography component="h2" variant="h4" align="center">
              Ocurrió un error al obtener los datos, intentalo de nuevo
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
              endIcon={<RefreshIcon />}
              onClick={refetch}
            >
              Reintentar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading || isFetching
              ? Array.from(new Array(7), (_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="text" width={170} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={170} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={170} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={170} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={40} height={40} />
                    </TableCell>
                  </TableRow>
                ))
              : data?.invitations.docs.map((invitation) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={invitation._id}
                    >
                      <TableCell>{invitation._id}</TableCell>
                      <TableCell>{invitation.guestName}</TableCell>
                      <TableCell>{invitation.startDate}</TableCell>
                      <TableCell>{invitation.endDate}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={() => onDelete(invitation._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data?.invitations.totalDocs ?? 0}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
      />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" align="center" mb={5}>
            ¿Está seguro que desea eliminarlo?
          </Typography>
          <Grid container justifyContent="space-evenly">
            <Button variant="contained" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleteInvitationStatus.isLoading}
            >
              Eliminar
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Paper>
  );
};

export default InvitationList;
