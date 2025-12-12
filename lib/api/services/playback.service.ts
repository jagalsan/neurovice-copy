/**
 * Playback service
 */

import { apiClient } from "../client/axios-client";
import type {
  PlaybackSessionStartInput,
  PlaybackSessionStartResponse,
  PlaybackEventBatchInput,
  PlaybackEventBatchResponse,
  PlaybackSessionCloseInput,
  PlaybackSessionCloseResponse,
  PlaybackAnalyticsResponse,
  PlaybackInsightsParams,
} from "../types/playback";

class PlaybackService {
  /**
   * Start a playback session
   */
  async startSession(
    data: PlaybackSessionStartInput
  ): Promise<PlaybackSessionStartResponse> {
    const response = await apiClient.post<PlaybackSessionStartResponse>(
      "/playback/sessions",
      data
    );
    return response.data;
  }

  /**
   * Send playback events in batch
   */
  async sendEvents(
    sessionId: string,
    data: PlaybackEventBatchInput
  ): Promise<PlaybackEventBatchResponse> {
    const response = await apiClient.post<PlaybackEventBatchResponse>(
      `/playback/sessions/${sessionId}/events`,
      data
    );
    return response.data;
  }

  /**
   * Close a playback session
   */
  async closeSession(
    sessionId: string,
    data: PlaybackSessionCloseInput
  ): Promise<PlaybackSessionCloseResponse> {
    const response = await apiClient.post<PlaybackSessionCloseResponse>(
      `/playback/sessions/${sessionId}/close`,
      data
    );
    return response.data;
  }

  /**
   * Get playback analytics insights (Admin only)
   */
  async getInsights(
    params?: PlaybackInsightsParams
  ): Promise<PlaybackAnalyticsResponse> {
    const response = await apiClient.get<PlaybackAnalyticsResponse>(
      "/admin/playback/insights",
      { params }
    );
    return response.data;
  }
}

export const playbackService = new PlaybackService();
