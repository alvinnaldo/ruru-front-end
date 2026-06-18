export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest';
  status: 'Online' | 'Offline' | 'Busy';
  lastActive: string;
  avatar?: string;
};

const mockMembers: TeamMember[] = [
  { id: 'u1', name: 'Alvin Naldo', email: 'alvin@example.com', role: 'Admin', status: 'Online', lastActive: new Date().toISOString() },
  { id: 'u2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Member', status: 'Online', lastActive: new Date().toISOString() },
  { id: 'u3', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Member', status: 'Busy', lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'u4', name: 'Sarah Connor', email: 's.connor@example.com', role: 'Guest', status: 'Offline', lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 'u5', name: 'Michael Scott', email: 'm.scott@example.com', role: 'Admin', status: 'Offline', lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

export const teamApi = {
  getMembers: async (): Promise<TeamMember[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockMembers), 500));
  }
};
