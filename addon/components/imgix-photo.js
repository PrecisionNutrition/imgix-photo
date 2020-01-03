import Component from '@ember/component';

import { computed } from '@ember/object';
import { and, match } from '@ember/object/computed';

import { task } from 'ember-concurrency';

import buildQueryParams from '../utils/build-query-params';

import layout from '../templates/components/imgix-photo';

/**
 * Display an image we have previously uploaded the Imgix API.
 *
 * https://docs.imgix.com/
 */
export default class ImgixPhoto extends Component {
  tagName = '';

  layout = layout;

  autoSetDimensions = true;

  params = null;

  url = null;

  @(task(function * () {
    return yield { isComplete: true, isLoading: false };
  }).cancelOn('willDestroyElement'))
  updateStateClasses;

  @computed('updateStateClasses.lastSuccessful.value.isComplete')
  get isComplete() {
    let lastSuccessfulState = this.updateStateClasses.lastSuccessful;

    return lastSuccessfulState && lastSuccessfulState.value.isComplete;
  }

  @computed('updateStateClasses.lastSuccessful.value.isLoading')
  get isLoading() {
    let lastSuccessfulState = this.updateStateClasses.lastSuccessful;

    return !lastSuccessfulState || lastSuccessfulState.value.isLoading;
  }

  @computed('autoSetDimensions')
  get includeDimensions() {
    let { autoSetDimensions } = this;

    // need `null` to exclude attribute from bindings
    return autoSetDimensions ? true : null;
  }

  @computed('url', 'queryParams')
  get imgSrc() {
    let {
      url,
      queryParams,
    } = this;

    return `${url}?${queryParams}`;
  }

  @match('url', /\.(heic)$/) isConversationNeeded;

  @and('includeDimensions', 'params.w') width;

  @and('includeDimensions', 'params.h') height;

  @computed('isConversationNeeded')
  get defaultParams() {
    let { isConversationNeeded } = this;

    let defaultParams = { dpr: window.devicePixelRatio };

    if (isConversationNeeded) {
      defaultParams.fm = 'jpg';
    }

    return defaultParams;
  }

  @computed('params.[]', 'defaultParams.[]')
  get finalParams() {
    let {
      defaultParams,
      params,
    } = this;

    if (params) {
      return { ...defaultParams, ...params };
    } else {
      return { ...defaultParams };
    }
  }

  @computed('finalParams.[]')
  get queryParams() {
    let { finalParams } = this;

    return buildQueryParams(finalParams);
  }
}
