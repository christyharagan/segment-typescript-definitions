declare type SegmentSourceRequest = {
  json(): any
  text(): string
  headers: Headers
  url: URL
}

declare type SegmentSourceIdentify = {
  traits?: SegmentIdentifyTraits
  userId: string
}

declare const Segment: {
  identify(_: SegmentOptions<SegmentSourceIdentify> & SegmentId): void
  set(_:SegmentSetObject<SegmentObjectDefinition> & SegmentId): void
  track<E extends SegmentEvents>(_: SegmentOptions<SegmentTrackObject<E>> & SegmentId): void
  group(_: SegmentOptions<SegmentGroup> & SegmentId): void
}

declare type SegmentSetObject<P extends object = object> = {
  id: string
  collection: string
  objects: {
    id: string
    properties: P
  }[]
}