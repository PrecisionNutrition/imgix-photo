imgix-photo [![CircleCI](https://circleci.com/gh/PrecisionNutrition/imgix-photo.svg?style=svg)](https://circleci.com/gh/PrecisionNutrition/imgix-photo)
==============================================================================

Provides a low-level component for rendering images that use the Imgix service.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------

```
ember install @precision-nutrition/imgix-photo
```


Usage
------------------------------------------------------------------------------

```html
<ImgixUrl
  @alt="Some helpful alt-text"
  @url="http://sub.imgix.com/path-to-image.jpg"
  @params={{hash
    w="300"
  }}
  class="Some Classes Here"
/>
```

Where `@params` uses the `{{hash` helper to specify any supported option for
Imgix.

### Other Properties

* `autoSetDimensions`: set to `false` if you don't want the rendered `<img` to
  have its `width` and `height` properties set. This is useful if you want a
  "responsive" image.

### Class Names

* Loading images will have an `.is-loading` class
* Completed images will have an `.is-complete` class

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
