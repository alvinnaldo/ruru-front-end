// import { apiClient } from '../../../lib/axios';

export interface WorkspaceMetrics {
  activeTasks: number;
  completedThisWeek: number;
  needsAttention: number;
}

export interface ActivityItem {
  id: string;
  type: 'COMMENT' | 'STATUS_CHANGE' | 'ASSIGNMENT';
  user: { name: string; avatarUrl?: string };
  taskName: string;
  description: string;
  timestamp: string;
}

// Mock delay to simulate network request
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const workspaceApi = {
  getMetrics: async (): Promise<WorkspaceMetrics> => {
    // In a real app: return (await apiClient.get('/workspace/metrics')).data;
    await delay(800);
    return {
      activeTasks: 14,
      completedThisWeek: 32,
      needsAttention: 2,
    };
  },
  
  getRecentActivity: async (): Promise<ActivityItem[]> => {
    // In a real app: return (await apiClient.get('/workspace/activity')).data;
    await delay(1000);
    return [
      {
        id: '1',
        type: 'STATUS_CHANGE',
        user: { name: 'Sarah Chen' },
        taskName: 'Design System Update',
        description: 'moved to In Progress',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      },
      {
        id: '2',
        type: 'COMMENT',
        user: { name: 'Alex Rivera' },
        taskName: 'API Authentication',
        description: 'commented: "I will push the fix by EOD."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: '3',
        type: 'ASSIGNMENT',
        user: { name: 'System' },
        taskName: 'Landing Page Copy',
        description: 'assigned to you',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      }
    ];
  }
};
