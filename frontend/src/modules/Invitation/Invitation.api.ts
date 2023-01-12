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
    }),
  }),
});

export const { useGetUserInvitationsQuery } = invitationsApi;

export const {
  endpoints: { getUserInvitations },
} = invitationsApi;
