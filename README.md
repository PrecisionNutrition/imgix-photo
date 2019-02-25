imgix-photo [![CircleCI](https://circleci.com/gh/PrecisionNutrition/imgix-photo.svg?style=svg)](https://circleci.com/gh/PrecisionNutrition/imgix-photo)
==============================================================================

Provides a low-level component for rendering images that use the Imgix service.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above

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

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
