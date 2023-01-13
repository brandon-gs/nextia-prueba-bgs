import { globalApi } from "../../globalApi";
import { Paginate } from "../../types/Paginate";
import { Invitation } from "./Invitation.schema";

export const invitationsApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserInvitations: builder.query<
      { invitations: Paginate<Invitation> },
      { limit: number; page: number }
    >({
      query: ({ limit, page }) => ({
        url: `/invitation?limit=${limit}&page=${page}`,
      }),
      providesTags: ["GET_INVITATIONS"],
    }),
    getInvitationById: builder.query<
      { invitation: Invitation },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/invitation/${id}`,
      }),
    }),
    createInvitation: builder.mutation<
      { message: string; invitation: Invitation },
      { startDate: string; endDate: string; guestName: string }
    >({
      query: (body) => ({
        url: "/invitation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GET_INVITATIONS"],
    }),
    deleteInvitation: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/invitation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GET_INVITATIONS"],
    }),
  }),
});

export const {
  useGetUserInvitationsQuery,
  useGetInvitationByIdQuery,
  useDeleteInvitationMutation,
  useCreateInvitationMutation,
} = invitationsApi;

export const {
  endpoints: {
    getInvitationById,
    getUserInvitations,
    deleteInvitation,
    createInvitation,
  },
} = invitationsApi;
