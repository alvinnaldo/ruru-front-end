export type Channel = {
  id: string;
  name: string;
  type: 'public' | 'private' | 'direct';
  unreadCount?: number;
};

export type Message = {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
};

const mockChannels: Channel[] = [
  { id: 'c1', name: 'general', type: 'public' },
  { id: 'c2', name: 'design-team', type: 'public', unreadCount: 3 },
  { id: 'c3', name: 'engineering', type: 'public' },
  { id: 'c4', name: 'project-alpha', type: 'private' },
  { id: 'd1', name: 'Jane Smith', type: 'direct', unreadCount: 1 },
  { id: 'd2', name: 'Alex Johnson', type: 'direct' },
];

const mockMessages: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', channelId: 'c1', userId: 'u2', userName: 'Jane Smith', content: 'Hey everyone! Welcome to the new workspace.', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: 'm2', channelId: 'c1', userId: 'u3', userName: 'Alex Johnson', content: 'Looks great! When are we starting the sprint?', timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString() },
    { id: 'm3', channelId: 'c1', userId: 'u1', userName: 'You', content: 'We kick off on Monday. Make sure all tasks are updated on the board.', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
  ],
};

export const chatApi = {
  getChannels: async (): Promise<Channel[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockChannels), 600));
  },
  getMessages: async (channelId: string): Promise<Message[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockMessages[channelId] || []), 400));
  }
};
