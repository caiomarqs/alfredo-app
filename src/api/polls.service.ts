import { httpClient } from './http-client';
import {
  Poll,
  CreatePollDTO,
  VotePollDTO,
  PaginatedResponse,
  PaginationParams,
} from '../@types';

class PollsService {
  /**
   * Get all polls with pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Poll>> {
    return httpClient.get<PaginatedResponse<Poll>>('/polls', params);
  }

  /**
   * Get poll by ID
   */
  async getById(id: string): Promise<Poll> {
    return httpClient.get<Poll>(`/polls/${id}`);
  }

  /**
   * Get active polls
   */
  async getActive(): Promise<Poll[]> {
    return httpClient.get<Poll[]>('/polls/active');
  }

  /**
   * Create new poll
   */
  async create(data: CreatePollDTO): Promise<Poll> {
    return httpClient.post<Poll>('/polls', data);
  }

  /**
   * Vote on poll
   */
  async vote(data: VotePollDTO): Promise<void> {
    return httpClient.post<void>(`/polls/${data.pollId}/vote`, {
      optionIds: data.optionIds,
    });
  }

  /**
   * Close poll
   */
  async close(id: string): Promise<Poll> {
    return httpClient.patch<Poll>(`/polls/${id}/close`);
  }

  /**
   * Delete poll
   */
  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`/polls/${id}`);
  }
}

export const pollsService = new PollsService();
