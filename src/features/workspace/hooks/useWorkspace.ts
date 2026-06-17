import { useQuery } from '@tanstack/react-query';
import { workspaceApi } from '../api/workspaceApi';

export const useWorkspaceMetrics = () => {
  return useQuery({
    queryKey: ['workspaceMetrics'],
    queryFn: workspaceApi.getMetrics,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: workspaceApi.getRecentActivity,
  });
};
