import Component from '@ember/component';

import { computed } from '@ember/object';
import { and } from '@ember/object/computed';

import { task, waitForEvent } from 'ember-concurrency';

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

  classNameBindings: [
    'isComplete',
    'isLoading',
  ],

  isComplete: false,
  isLoading: true,

  updateStateClasses: task(function * () {
    yield waitForEvent(this.element, 'load');

    this.setProperties({
      isComplete: true,
      isLoading: false,
    });
  }).on('didRender')
    .cancelOn('willDestroyElement'),

  alt: null,

  autoSetDimensions: true,

  includeDimensions: computed('autoSetDimensions', function() {
    let { autoSetDimensions } = this;

    // need `null` to exclude attribute from bindings
    return autoSetDimensions ? true : null;
  }),

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

  width: and('includeDimensions', 'params.w'),

  height: and('includeDimensions', 'params.h'),
});
