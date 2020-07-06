declare const analytics: AnalyticsJS

declare type AnalyticsJS = {
  load(api_key: string): void
  identify(user_id: string, traits?: SegmentIdentifyProtocol, options?: SegmentOptions, callback?: () => void): void
  group(group_id: string, traits?: SegmentGroupProtocol, options?: SegmentOptions, callback?: () => void): void
  track<Event extends SegmentEvents>(event: Event, properties?: SegmentTrackProtocol<Event>, options?: SegmentOptions, callback?: () => void): void
  alias(user_id: string, previous_id?: string, options?: SegmentOptions, callback?: () => void): void
  screen(category: string, name?: string, options?: SegmentOptions, callback?: () => void): void

  ready(callback: () => void): void

  reset(): void
}