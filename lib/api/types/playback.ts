/**
 * Playback related types and interfaces
 */

export type PlaybackSessionStatus = "ongoing" | "closed";

export type PlaybackEventType = 
  | "play"
  | "pause"
  | "seek"
  | "buffer"
  | "error"
  | "quality_change"
  | "volume_change";

export type PlaybackExitReason = 
  | "user_exit"
  | "completed"
  | "error"
  | "timeout"
  | "network_error";

export interface PlaybackSessionStartInput {
  sceneId: number;
  deviceType?: string;
  platform?: string;
  quality?: string;
}

export interface PlaybackSessionStartResponse {
  sessionId: string;
  status: PlaybackSessionStatus;
  startedAt: string;
}

export interface PlaybackEvent {
  type: PlaybackEventType;
  timestamp: number;
  currentTime?: number;
  duration?: number;
  quality?: string;
  volume?: number;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface PlaybackEventBatchInput {
  events: PlaybackEvent[];
}

export interface PlaybackEventBatchResponse {
  storedEvents: number;
  addedSegments: number;
  totalWatchTimeSeconds: number;
}

export interface PlaybackSessionCloseInput {
  exitReason: PlaybackExitReason;
  finalCurrentTime?: number;
  finalDuration?: number;
  totalWatchTimeSeconds?: number;
}

export interface PlaybackSessionCloseResponse {
  sessionId: string;
  status: PlaybackSessionStatus;
  totalWatchTimeSeconds: number;
  exitReason: PlaybackExitReason;
  endedAt: string;
}

export interface PlaybackSegment {
  startTime: number;
  endTime: number;
  viewCount: number;
  totalWatchTimeSeconds: number;
}

export interface PlaybackSceneStats {
  sceneId: number;
  sceneTitle: string;
  totalSessions: number;
  totalWatchTimeSeconds: number;
  averageWatchTimeSeconds: number;
  completionRate: number;
  mostViewedSegments: PlaybackSegment[];
}

export interface PlaybackAnalyticsResponse {
  totalSessions: number;
  totalWatchTimeSeconds: number;
  averageSessionDurationSeconds: number;
  uniqueUsers: number;
  topScenes: PlaybackSceneStats[];
  periodStart: string;
  periodEnd: string;
}

export interface PlaybackInsightsParams {
  days?: number;
  segmentSizeSeconds?: number;
}
