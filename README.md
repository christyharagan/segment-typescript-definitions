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

***Important!*** All users must define the types ```SegmentIdentifyProtocol```, ```SegmentGroupProtocol```, ```SegmentTrackProtocol```, ```SegmentTrackProtocolUnion``` and ```SegmentEvents```. This is used for typing *track*, *identify* and *group* calls. If no defined schema exists, simply setting (in some ```.d.ts``` file within the project scope): 
```ts 
declare type SegmentIdentifyProtocol = object
declare type SegmentGroupProtocol = object

declare type SegmentEvents = string
declare type SegmentTrackProtocol<E extends SegmentEvents> = object

declare type SegmentTrackProtocolUnion = object
``` 
Otherwise:

 * ```SegmentIdentifyProtocol``` should be an object definition
 * ```SegmentGroupProtocol``` should be an object definition
 * ```SegmentEvents``` should be a string union, listing all ```track``` event names
 * ```SegmentTrackProtocol``` should be a [conditional type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) mapping each event name to its event properties
 * ```SegmentTrackProtocolUnion``` should be a [discriminated union](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions).
 
 An example would be: 

```ts
declare type SegmentIdentifyProtocol = {
  email: string
  name: string
  consents_to_email_marketing: boolean
}

declare type SegmentGroupProtocol = {
  org_name: string
}

declare type SegmentEvents = 'Product Viewed' | 'Product Purchased'
declare type SegmentTrackProtocol<E extends SegmentEvents> = E extends 'Product Viewed' ? ProductViewed : E extends 'Product Purchased' ? ProductPurchased : never

declare type SegmentTrackProtocolUnion = {
  event: 'Product Viewed',
  properties: ProductViewed
} | {
  event: 'Product Purchased',
  properties: ProductPurchased
}

declare type ProductViewed = {
  product_id: number
  product_image_url: string
}

declare type ProductPurchased = {
  product_id: number
  quantity: number
}
```

The conditional type form solves for when the track event is an output (e.g. via an ```analytics.track``` call), where-as the discriminated unions are for when the track event in an input (e.g. as input to a custom destination function). Sadly, TypeScript does not yet allow us to choose one form for both scenarios.

In order to automatically generate ```SegmentTrackProtocol```, ```SegmentIdentifyProtocol```, and ```SegmentGroupProtocol``` from Segment's Protocol tracking plans, consider using [Segment TSD Generator](https://www.github.com/christyharagan/segment-tsd-generator). Note: this just generates typing definitions to make consuming the raw APIs easier. If you want a more full-featured approach, consider using [TypeWriter](https://github.com/segmentio/typewriter).

### Analytics.JS

For general information on using Analytics.JS see the [docs](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/). To consume the definitions, define a TypeScript definition file within your source directory that looks like:

```ts
/// <reference path="../node_modules/segment-typescript-definitions/common.d.ts"/>
/// <reference path="../node_modules/segment-typescript-definitions/analytics.d.ts"/>
```

Beyond that, nothing else should change in how you consume the library.

### Custom Sources

For a full fledged local development of Segment Functions, consider using [Segment Sloth](https://www.github.com/christyharagan/segment-sloth).

For general information on writing a custom source see the [docs](https://segment.com/docs/connections/sources/custom-sources/).

In order to use the definitions, you'll need to manually include some extra typing information in your custom source function. First, define a TypeScript definition file in your source directory that looks like:

```ts
/// <reference path="../node_modules/segment-typescript-definitions/common.d.ts"/>
/// <reference path="../node_modules/segment-typescript-definitions/custom-source.d.ts"/>
```

For your function itself, define a TypeScript file that looks like:

```ts
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

For a full fledged local development of Segment Functions, consider using [Segment Sloth](https://www.github.com/christyharagan/segment-sloth).

For general information on writing a custom source see the [docs](https://segment.com/docs/connections/destinations/custom-destinations/).

However, in order to use the definitions, you'll need to manually include some extra typing information in your custom source function. First, define a TypeScript definition file in your source directory that looks like:

```ts
/// <reference path="../node_modules/segment-typescript-definitions/common.d.ts"/>
/// <reference path="../node_modules/segment-typescript-definitions/custom-destination.d.ts"/>
```

For your function itself, define a TypeScript file that looks like:

```ts
async function onTrack(event:SegmentTrackEvent, settings: SegmentSettings) {
  //...
}

async function onIdentify(event:SegmentIdentifyEvent, settings: SegmentSettings) {
  //...
}

async function onGroup(event:SegmentGroupEvent, settings: SegmentSettings) {
  //...
}

async function onPage(event:SegmentPageEvent, settings: SegmentSettings) {
  //...
}

async function onAlias(event:SegmentAliasEvent, settings: SegmentSettings) {
  //...
}

async function onScreen(event:SegmentScreenEvent, settings: SegmentSettings) {
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
