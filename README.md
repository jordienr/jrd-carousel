# JrdCarousel

JrdCarousel is a carousel component written 100% in JavaScript.

# TOC

1. [Roadmap](#roadmap)
1. [Get started](#get-started)
1. [Methods](#methods)
1. [Parameters](#parameters)

## Roadmap

- [ ] Make it work with arrow keys
- [ ] Preload next image
- [ ] Animations

## Get started

1. Install `jrd-carousel`

  ```bash

  npm i jrd-carousel

  ```

2. Create your carousel

  ```html
  <!-- index.html -->
  <div id="my-carousel"></div>
  ```

  ```js
  // script.js
  import JrdCarousel from 'jrd-carousel'

  const options = {
    images: [
      {
        src: 'https://images.com/image0.jpg',
        alt: 'Image alt 0'
      },
      {
        src: 'https://images.com/image1.jpg',
        alt: 'Image alt 1'
      },
      {
        src: 'https://images.com/image2.jpg',
        alt: 'Image alt 2'
      },
    ]
  }

  JrdCarousel('my-carousel', options)
  ```

### Methods

#### JrdCarousel()

```js
JrdCarousel(domId: string, options: object)
```

### Parameters

#### domId

Represents the id of the DOM element where we want to mount the carousel.

#### options

Holds the settings for the carousel

##### Properties

- **images**: `string[]`
Required
Array with `image` objects. They will be loaded in order

Must have a src attribute and a alt attribute.

__

- **autoplay**: `boolean`
Optional
Default: `true`
Makes the carousel slide automatically every `interval`
__
- **interval**: `number`
Optional
Default: `1500`
Milliseconds between every slide change
__
- **imagesToPreload**: `number`
Optional
Default: `2`
How many images you want to preload when the component is mounted.
By default the component will load the first 2 images and lazy load the rest when they have to be shown.

```js
// Options example

const options = {
  images: [
      {
        src: 'https://images.com/image0.jpg',
        alt: 'Image alt 0'
      },
      {
        src: 'https://images.com/image1.jpg',
        alt: 'Image alt 1'
      },
      {
        src: 'https://images.com/image2.jpg',
        alt: 'Image alt 2'
      },
    ],
  imagesToPreload: 1,
  interval: 3000
}


```

# About

JrdCarousel is a technical test made by @jordienr for Domestika.
