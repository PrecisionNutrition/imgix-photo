import Component from '@ember/component';

import { computed } from '@ember/object';
import { and, match } from '@ember/object/computed';

import { task, waitForEvent } from 'ember-concurrency';

import buildQueryParams from '../utils/build-query-params';

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

  imgSrc: computed('url', 'queryParams', function() {
    let {
      url,
      queryParams,
    } = this;

    return `${url}?${queryParams}`;
  }),

  isConversationNeeded: match('url', /\.(heic)$/),

  width: and('includeDimensions', 'params.w'),

  height: and('includeDimensions', 'params.h'),

  defaultParams: computed('isConversationNeeded', function() {
    let { isConversationNeeded } = this;

    let defaultParams = { dpr: window.devicePixelRatio };

    if (isConversationNeeded) {
      defaultParams.fm = 'jpg';
    }

    return defaultParams;
  }),

  finalParams: computed('params.[]', 'defaultParams.[]', function() {
    let {
      defaultParams,
      params,
    } = this;

    if (params) {
      return { ...defaultParams, ...params };
    } else {
      return { ...defaultParams };
    }
  }),

  queryParams: computed('finalParams.[]', function() {
    let { finalParams } = this;

    return buildQueryParams(finalParams);
  }),
});
