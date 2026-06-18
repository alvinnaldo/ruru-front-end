export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  type: 'milestone' | 'task' | 'update' | 'launch';
  author: {
    name: string;
    avatar?: string;
  };
};

const mockTimeline: TimelineEvent[] = [
  {
    id: 'e1',
    title: 'Project Kickoff',
    description: 'Initial meeting with stakeholders to define scope and requirements for Q3.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    type: 'milestone',
    author: { name: 'Alvin Naldo' },
  },
  {
    id: 'e2',
    title: 'Design System Approved',
    description: 'The core design system and component library have been approved by the design team.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    type: 'update',
    author: { name: 'Jane Smith' },
  },
  {
    id: 'e3',
    title: 'Frontend Architecture Setup',
    description: 'Initial React architecture, routing, and state management configured.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    type: 'task',
    author: { name: 'Alex Johnson' },
  },
  {
    id: 'e4',
    title: 'Authentication Module',
    description: 'Completed JWT authentication and login/register pages.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    type: 'task',
    author: { name: 'Alvin Naldo' },
  },
  {
    id: 'e5',
    title: 'Beta Launch',
    description: 'Deploying the first beta version to the staging environment for internal testing.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days in the future
    type: 'launch',
    author: { name: 'Sarah Connor' },
  },
];

export const timelineApi = {
  getEvents: async (): Promise<TimelineEvent[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockTimeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())), 600));
  }
};
