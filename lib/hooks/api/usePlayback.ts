/**
 * Playback Hooks
 * React Query hooks for playback operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { playbackService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  PlaybackSessionStartInput,
  PlaybackEventBatchInput,
  PlaybackSessionCloseInput,
  PlaybackInsightsParams,
} from "@/lib/api/types";

/**
 * Get playback analytics insights (admin)
 */
export function usePlaybackInsights(params?: PlaybackInsightsParams) {
  return useQuery({
    queryKey: queryKeys.playback.insights(params as Record<string, unknown>),
    queryFn: () => playbackService.getInsights(params),
  });
}

/**
 * Start a playback session
 */
export function useStartPlaybackSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PlaybackSessionStartInput) =>
      playbackService.startSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.playback.all });
    },
    onError: (error) => {
      console.error("Start playback session failed:", getErrorMessage(error));
    },
  });
}

/**
 * Send playback events in batch
 */
export function useSendPlaybackEvents() {
  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: PlaybackEventBatchInput;
    }) => playbackService.sendEvents(sessionId, payload),
    onError: (error) => {
      console.error("Send playback events failed:", getErrorMessage(error));
    },
  });
}

/**
 * Close a playback session
 */
export function useClosePlaybackSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: PlaybackSessionCloseInput;
    }) => playbackService.closeSession(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.playback.all });
    },
    onError: (error) => {
      console.error("Close playback session failed:", getErrorMessage(error));
    },
  });
}
