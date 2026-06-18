import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/teamApi';

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['teamMembers'],
    queryFn: teamApi.getMembers,
  });
};
