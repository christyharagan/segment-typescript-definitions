Segment TypeScript Definitions
===

Overview
---

This library provides TypeScript definitions for the following [Segment](https://segment.com) libraries and APIs:

 * [common.d.ts](./segment-common.d.ts). This provides definitions for [the Segment spec](https://segment.com/docs/connections/spec/): This is a basis for all of Segment's APIs and SDKs.
 * [analytics.d.ts](./segment-analytics.d.ts). This provides definitions for [Analytics.js](https://github.com/segmentio/analytics.js/)
 * [custom-source.d.ts](./segment-sources.d.ts). This provides definitions for [Custom Sources](https://segment.com/docs/connections/sources/custom-sources/)
 * [custom-destination.d.ts](./segment-destinations.d.ts). This provides definitions for [Custom Destinations](https://segment.com/docs/connections/destinations/custom-destinations/)

Important Notes
---


***Important:*** ```segment-sources.d.ts``` consumers  must define the type ```SegmentObjectDefinition```. This is used for typing calls against the *set* method. If no defined schema exists, simply setting 
```ts 
declare type SegmentObjectDefinition = any
``` 
in some ```.d.ts``` file will suffice.

Install
---

Install via NPM:

```
npm i --save segment-typescript-definitions
```

or Yarn:

```
yarn install segment-typescript-definitions
```


Usage
---

To import the definitions, your code should look something like:

```ts
import 'segment-typescript-definitions/common'
```

Then depending on which environment you're targeting will depend on what other definition you pull in (see the following sections for more details).

***Important!*** All users must define the types ```SegmentTrackProtocol``` and ```SegmentEvents```. This is used for typing *track* calls. If no defined schema exists, simply setting: 
```ts 
declare type SegmentEvents = string
declare type SegmentTrackProtocol = any
``` 
in some ```.d.ts``` file will suffice. Otherwise, ```SegmentEvents``` should be a string union, listing all ```track``` event names, and ```SegmentTrackProtocol``` should be a conditional type mapping each event name to its event properties. An example would be: 

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

In order to automatically generate ```SegmentTrackProtocol```, ```SegmentIdentifyProtocol```, and ```SegmentGroupProtocol``` from Segment's Protocol tracking plans, consider using [Segment TSD Generator](https://raw.githubusercontent.com/christyharagan/segment-tsd-generator). Note: this just generates typing definitions to make consuming the raw APIs easier. If you want a more full-featured approach, consider using [TypeWriter](https://github.com/segmentio/typewriter).

### Analytics.JS

For general information on using Analytics.JS see the [docs](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/). To consume the definitions, in every TypeScript file in which you make an event call, have the following code:

```ts
import 'segment-typescript-definitions/common'
import 'segment-typescript-definitions/analytics'
```

Beyond that, nothing else should change in how you consume the library.

### Custom Sources

For general information on writing a custom source see the [docs](https://segment.com/docs/connections/sources/custom-sources/).

However, in order to use the definitions, you'll need to manually include some extra typing information in your custom source function. As an example:

```ts
import 'segment-typescript-definitions/common'
import 'segment-typescript-definitions/custom-source'

declare type SegmentObjectDefinition = {/*...*/} // See "important" note below for details

async function onRequest(request:SegmentSourceRequest, settings:SegmentSettings) {
    Segment.group({
      userId: 'My Id',
      groupId: 'My Group'
    })
}
```

***Important:*** Users must define the type ```SegmentObjectDefinition```. This is used for typing calls against the *set* method. If no defined schema exists, simply setting 
```ts 
declare type SegmentObjectDefinition = any
``` 

If you wish to have full typings for all included dependencies, include the following packages:

 * @types/atob
 * @types/btoa
 * aws-sdk
 * form-data
 * @types/lodash
 * @types/node
 * @types/node-fetch
 * @types/oauth
 * @types/xml

### Custom Destinations

For general information on writing a custom source see the [docs](https://segment.com/docs/connections/destinations/custom-destinations/).

However, in order to use the definitions, you'll need to manually include some extra typing information in your custom source function. As an example:

```ts
import 'segment-typescript-definitions/common'
import 'segment-typescript-definitions/custom-destination'

async function onTrack(event:SegmentProcessedEvent<SegmentTrackEvent>, settings: SegmentSettings) {
  //...
}

async function onIdentify(event:SegmentProcessedEvent<SegmentIdentifyEvent>, settings: SegmentSettings) {
  //...
}

async function onGroup(event:SegmentProcessedEvent<SegmentGroupEvent>, settings: SegmentSettings) {
  //...
}

async function onPage(event:SegmentProcessedEvent<SegmentPageEvent>, settings: SegmentSettings) {
  //...
}

async function onAlias(event:SegmentProcessedEvent<SegmentAliasEvent>, settings: SegmentSettings) {
  //...
}
```

If you wish to have full typings for all included dependencies, include the following packages:

 * @types/atob
 * @types/btoa
 * aws-sdk
 * @types/lodash
 * @types/node
 * @types/node-fetch
