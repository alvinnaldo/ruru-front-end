import { useQuery } from '@tanstack/react-query';
import { timelineApi } from '../api/timelineApi';

export const useTimelineEvents = () => {
  return useQuery({
    queryKey: ['timelineEvents'],
    queryFn: timelineApi.getEvents,
  });
};
