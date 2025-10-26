export type PollStatus = 'draft' | 'active' | 'closed';
export type PollType = 'single_choice' | 'multiple_choice' | 'yes_no';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  type: PollType;
  options: PollOption[];
  status: PollStatus;
  createdBy: {
    id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  totalVotes: number;
  hasVoted?: boolean;
  userVote?: string[]; // option IDs
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePollDTO {
  title: string;
  description?: string;
  type: PollType;
  options: Array<{ text: string }>;
  startDate: string;
  endDate: string;
}

export interface VotePollDTO {
  pollId: string;
  optionIds: string[];
}
