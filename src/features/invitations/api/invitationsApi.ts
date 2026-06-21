export type Invitation = {
  id: string;
  workspaceName: string;
  inviterName: string;
  role: 'Member' | 'Observer';
  createdAt: string;
};

const mockInvitations: Invitation[] = [
  { id: 'inv1', workspaceName: 'Project Delta', inviterName: 'Jane Smith', role: 'Member', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'inv2', workspaceName: 'Marketing Q3', inviterName: 'Alex Johnson', role: 'Observer', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export const invitationsApi = {
  getInvitations: async (): Promise<Invitation[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockInvitations), 600));
  }
};
