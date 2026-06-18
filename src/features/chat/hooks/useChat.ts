import { useQuery } from '@tanstack/react-query';
import { chatApi } from '../api/chatApi';

export const useChannels = () => {
  return useQuery({
    queryKey: ['chat', 'channels'],
    queryFn: chatApi.getChannels,
  });
};

export const useMessages = (channelId: string) => {
  return useQuery({
    queryKey: ['chat', 'messages', channelId],
    queryFn: () => chatApi.getMessages(channelId),
    enabled: !!channelId,
  });
};
