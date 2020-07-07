// declare interface SegmentGroupProtocol { }
// declare interface SegmentIdentifyProtocol { }

declare type SegmentIdentify = {
  traits: SegmentIdentifyTraits
  // userId: string
}
declare type SegmentIdentifyEvent = SegmentIdentify & {
  type: 'identify'
} & SegmentProcessedEvent
declare type SegmentIdentifyTraits = {
  address?: {
    city?: string
    country?: string
    postalCode?: string
    state?: string
    street?: string
  }
  age?: number
  avatar?: string
  birthday?: Date
  company?: {
    name?: string
    id?: string | number
    industry?: string
    employee_count?: number
    plan?: string
  }
  createdAt?: Date
  description?: string
  email?: string
  firstName?: string
  gender?: string
  id?: string
  lastName?: string
  name?: string
  phone?: string
  title?: string
  username?: string
  website?: string
} & SegmentIdentifyProtocol

declare type SegmentGroup = {
  groupId: string
  traits?: SegmentGroupTraits
}
declare type SegmentGroupEvent = SegmentGroup & {
  type: 'group'
} & SegmentProcessedEvent
declare type SegmentGroupTraits = {
  address?: {
    city?: string
    country?: string
    postalCode?: string
    state?: string
    street?: string
  }
  avatar?: string
  createdAt?: Date
  description?: string
  email?: string
  employees?: string
  id?: string
  industry?: string
  name?: string
  phone?: string
  website?: string
  plan?: string
} & SegmentGroupProtocol

declare type SegmentTrackObject<E extends SegmentEvents> = {
  event: E
  properties: SegmentTrackProtocol<E>
}

declare type SegmentTrackEvent = {
  type: 'track'
} & SegmentTrackProtocolUnion & SegmentProcessedEvent

declare type SegmentAlias = {
  previousId: string
  userId?: string
}
declare type SegmentAliasEvent = SegmentAlias & {
  type: 'alias'
} & SegmentProcessedEvent

declare type SegmentPage = {
  name?: string
  properties?: SegmentPageProperties
}
declare type SegmentPageEvent = SegmentPage & {
  type: 'page'
} & SegmentProcessedEvent
declare type SegmentPageProperties = {
  name?: string
  path?: string
  referrer?: string
  search?: string
  title?: string
  url?: string
  keywords?: string[]
} & { [p: string]: any }

declare type SegmentScreen = {
  name?: string
  properties?: SegmentScreenProperties
}
declare type SegmentScreenEvent = SegmentScreen & {
  type: 'screen'
} & SegmentProcessedEvent

declare type SegmentScreenProperties = {
  name?: string
} & { [p: string]: any }

declare type SegmentOptions = {
  context?: SegmentContext
  integrations?: {
    All?: boolean
  } & { [p: string]: boolean } // TODO! This isn't technically correct
  externalIds?: SegmentExternalIds
} & SegmentId

declare type SegmentId = {
  anonymousId: string
} | {
  userId: string
}

declare type SegmentProcessedEvent = SegmentOptions & {
  messageId: string
  receivedAt: string
  sentAt: string
  timestamp: string
  originalTimestamp: string
}

declare type SegmentSettings = { [s: string]: string }

declare type SegmentExternalIds = {
  collection: 'users',
  encoding: 'none',
  type: string,
  id: string
}[]

declare type SegmentContext = {
  active?: boolean
  app?: {
    name: string
    version: string
    build: string
    namespace: string
  }
  campaign?: {
    name: string
    source: string
    medium: string
    term: string
    content: string
  }
  device?: {
    id: string
    advertisingId: string
    adTrackingEnabled: boolean
    manufacturer: string
    model: string
    name: string
    type: string
    token: string
  }
  ip: string
  library: {
    name: string
    version: string
  }
  locale?: string
  location?: {
    city: string
    country: string
    latitude: number
    longitude: number
    speed: number
  }
  network?: {
    bluetooth: boolean
    carrier: string
    cellular: boolean
    wifi: boolean
  }
  os?: {
    name: string
    version: string
  }
  page?: {
    path: string
    referrer: string
    search: string
    title: string
    url: string
  }
  referrer?: {
    id: string
    type: string
  }
  screen?: {
    width: number
    height: number
    density: number
  }
  groupId?: string
  timezone?: string
  userAgent?: string
}