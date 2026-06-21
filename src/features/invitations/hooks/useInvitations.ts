import { useQuery } from '@tanstack/react-query';
import { invitationsApi } from '../api/invitationsApi';

export const useInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: invitationsApi.getInvitations,
  });
};
