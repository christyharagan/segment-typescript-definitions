Segment TypeScript Definitions
===

Overview
---

This library provides TypeScript definitions for the following [Segment](https://segment.com) libraries and APIs:

 * [segment-common.d.ts](./segment-common.d.ts). This provides definitions for [the Segment spec](https://segment.com/docs/connections/spec/): This is a basis for all of Segment's APIs and SDKs.
 * [segment-common.d.ts](./segment-analytics.d.ts). This provides definitions for [Analytics.js](https://github.com/segmentio/analytics.js/)
 * [segment-common.d.ts](./segment-sources.d.ts). This provides definitions for [Custom Sources](https://segment.com/docs/connections/sources/custom-sources/)
 * [segment-common.d.ts](./segment-destinations.d.ts). This provides definitions for [Custom Destinations](https://segment.com/docs/connections/destinations/custom-destinations/)

Important Notes
---

***Important:***: All users must define the types ```SegmentTrackProtocol``` and ```SegmentEvents```. This is used for typing *track* calls. If no defined schema exists, simply setting: 
```ts 
declare type SegmentEvents = string
declare type SegmentTrackProtocol = any
``` 
in some ```.d.ts``` file will suffice. Otherwise, ```ts SegmentEvents``` should be a string union, listing all ```track``` event names, and ```SegmentTrackProtocol``` should be a conditional type mapping each event name to its event properties. An example would be: 

```ts
declare type SegmentEvents = 'Product Viewed' | 'Product Purchased'
declare type SegmentTrackProtocol<E extends SegmentEvents> = E extends 'Product Viewed' ? ProductViewed : E extends 'Product Purchased' ? ProductPurchased : never

declare type ProductViewed = {
  product_id: number
  product_image_url: string
}

declare type ProductPurchased = {
  product_id: number
  quantity: number
}
```

***Important:*** ```segment-sources.d.ts``` consumers  must define the type ```SegmentObjectDefinition```. This is used for typing calls against the *set* method. If no defined schema exists, simply setting 
```ts 
declare type SegmentObjectDefinition = any
``` 
in some ```.d.ts``` file will suffice.

General Usage
---

There are two interface definitions that can be extended to support strong typing of *identify* and *group* calls. These are ```SegmentIdentifyProtocol``` and ```SegmentGroupProtocol```, respectively. Examples would be:

```ts
declare interface SegmentIdentifyProtocol {
  name: string
  email: string
}
declare interface SegmentGroupProtocol {
  company_name: string
}
```

In order to automatically generate ```SegmentTrackProtocol```, ```SegmentIdentifyProtocol```, and ```SegmentGroupProtocol``` from Segment's Protocol tracking plans, consider using [Segment TSD Generator](https://raw.githubusercontent.com/christyharagan/segment-tsd-generator). Note: this just generates typing definitions to make consuming the raw APIs easier. If you want a more full-featured approach, consider using [TypeWriter](https://github.com/segmentio/typewriter)

Final note: if you ```npm i segment-typescript-definitions```, all ```.d.ts``` files will be in scope. This is harmless, but pollutes the namespace with functions that won't apply to the specific environment you're targetting. If, you just want to support a single environment with no pollution, it may be better to copy (or symlink) the specific files you want. Note: you will always need ```segment-common.d.ts```.