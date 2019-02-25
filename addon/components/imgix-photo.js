import Component from '@ember/component';

import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

/**
 * Display an image we have previously uploaded the Imgix API.
 *
 * https://docs.imgix.com/
 */
export default Component.extend({
  tagName: 'img',

  attributeBindings: [
    'alt',
    'height',
    'imgSrc:src',
    'width',
  ],

  alt: null,

  params: null,

  url: null,

  queryParams: computed('params.[]', function() {
    let defaultParams = { dpr: window.devicePixelRatio };
    let params = this.params || {};
    let finalParams = Object.assign(defaultParams, params);

    let joinedParams = Object
      .entries(finalParams)
      .map(function([key, value]) {
        return `${key}=${value}`;
      })
      .join('&');

    return joinedParams;
  }),

  imgSrc: computed('url', 'queryParams', function() {
    let {
      url,
      queryParams,
    } = this;

    return `${url}?${queryParams}`;
  }),

  width: readOnly('params.w'),

  height: readOnly('params.h'),
});
