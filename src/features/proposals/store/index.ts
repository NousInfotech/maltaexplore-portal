import { create } from 'zustand';
import { Request, Proposal, Engagement } from '../types';
import { mockRequests, mockProposals, mockEngagements } from '../constants';

interface ProposalsStore {
  requests: Request[];
  proposals: Proposal[];
  engagements: Engagement[];
  selectedRequest: Request | null;
  selectedProposal: Proposal | null;
  selectedEngagement: Engagement | null;
  
  // Actions
  setSelectedRequest: (request: Request | null) => void;
  setSelectedProposal: (proposal: Proposal | null) => void;
  setSelectedEngagement: (engagement: Engagement | null) => void;
  
  // Getters
  getProposalsForRequest: (requestId: string) => Proposal[];
  getEngagementForProposal: (proposalId: string) => Engagement | null;
  getRequestById: (requestId: string) => Request | null;
  getProposalById: (proposalId: string) => Proposal | null;
  
  // Filters
  getRequestsByStatus: (status: Request['status']) => Request[];
  getProposalsByStatus: (status: Proposal['status']) => Proposal[];
  getEngagementsByStatus: (status: Engagement['status']) => Engagement[];
}

export const useProposalsStore = create<ProposalsStore>((set, get) => ({
  requests: mockRequests,
  proposals: mockProposals,
  engagements: mockEngagements,
  selectedRequest: null,
  selectedProposal: null,
  selectedEngagement: null,
  
  setSelectedRequest: (request) => set({ selectedRequest: request }),
  setSelectedProposal: (proposal) => set({ selectedProposal: proposal }),
  setSelectedEngagement: (engagement) => set({ selectedEngagement: engagement }),
  
  getProposalsForRequest: (requestId) => {
    const { proposals } = get();
    return proposals.filter(proposal => proposal.requestId === requestId);
  },
  
  getEngagementForProposal: (proposalId) => {
    const { engagements } = get();
    return engagements.find(engagement => engagement.proposalId === proposalId) || null;
  },
  
  getRequestById: (requestId) => {
    const { requests } = get();
    return requests.find(request => request.id === requestId) || null;
  },
  
  getProposalById: (proposalId) => {
    const { proposals } = get();
    return proposals.find(proposal => proposal.id === proposalId) || null;
  },
  
  getRequestsByStatus: (status) => {
    const { requests } = get();
    return requests.filter(request => request.status === status);
  },
  
  getProposalsByStatus: (status) => {
    const { proposals } = get();
    return proposals.filter(proposal => proposal.status === status);
  },
  
  getEngagementsByStatus: (status) => {
    const { engagements } = get();
    return engagements.filter(engagement => engagement.status === status);
  }
})); 