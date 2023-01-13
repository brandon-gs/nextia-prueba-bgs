import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../../../components";
import { CreateInvitation, Invitation } from "../../Invitation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputDate from "../../../../components/FormInputDate/FormInputDate";
import { Container } from "@mui/material";
import { format, formatISO, isAfter } from "date-fns";
import { useCreateInvitationMutation } from "../../Invitation.api";
import InvitationModal from "../InvitationModal/InvitationModal";
import useListenFormErrors from "../../../../hook/useListenFormErrors";

const InvitationCreateForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [invitation, setInvitation] = useState<null | Invitation>(null);

  const [createInvitation, { isLoading, isSuccess, error, isError }] =
    useCreateInvitationMutation();

  const methods = useForm<CreateInvitation>({
    resolver: zodResolver(CreateInvitation),
  });

  const { handleSubmit, setError, reset } = methods;

  const formatToISO = (date: Date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  };

  const onSubmitHandler: SubmitHandler<CreateInvitation> = async (values) => {
    const _startDate = new Date(values.startDate);
    const _endDate = new Date(values.endDate);

    if (isAfter(_startDate, _endDate)) {
      setError("endDate", {
        message:
          "La hora de finalización no debe ser menor a la fecha de inicio",
      });
    }
    const body = {
      ...values,
      startDate: formatToISO(_startDate),
      endDate: formatToISO(_endDate),
    };
    try {
      const invitation = await createInvitation(body).unwrap();
      setInvitation(invitation.invitation);
      setShowModal(true);
      reset();
    } catch (error) {}
  };

  useListenFormErrors({ isError, setError, error });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AddCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Crear invitación
      </Typography>
      <Container maxWidth="xs">
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 1 }}
          >
            <FormInput
              margin="normal"
              required
              fullWidth
              id="guestName"
              label="Nombre del invitado"
              name="guestName"
              autoComplete="guestName"
              autoFocus
            />
            <FormInputDate name="startDate" label="Fecha de inicio" />
            <FormInputDate name="endDate" label="Fecha de finalizacion" />
            {/* <FormInputDateEnd name="endDate" label="Fecha de finalizacion" /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Crear invitación
            </Button>
          </Box>
        </FormProvider>
      </Container>
      <InvitationModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setInvitation(null);
        }}
        invitation={invitation}
      />
    </Box>
  );
};

export default InvitationCreateForm;
