import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';

import { task } from 'ember-concurrency';

import buildQueryParams from '../utils/build-query-params';

/**
 * Display an image we have previously uploaded the Imgix API.
 *
 * https://docs.imgix.com/
 */
export default class ImgixPhoto extends Component {
  @tracked
  isComplete = false;

  @tracked
  isLoading = true;

  get autoSetDimensions() {
    const {
      args: {
        autoSetDimensions,
      },
    } = this;

    if (typeof autoSetDimensions === 'undefined') {
      return true;
    } else {
      return autoSetDimensions;
    }
  }

  @(task(function * () {
    yield;

    this.isComplete = true;
    this.isLoading = false;
  }).cancelOn('willDestroy'))
  updateStateClasses;

  get includeDimensions() {
    // need `null` to exclude attribute from bindings
    return this.autoSetDimensions ? true : null;
  }

  get isConversionNeeded() {
    const { args: { url } } = this;

    return url?.match(/\.(heic)$/);
  }

  get width() {
    return this.includeDimensions && this.args.params?.w;
  }

  get height() {
    return this.includeDimensions && this.args.params?.h;
  }

  get defaultParams() {
    let defaultParams = { dpr: window.devicePixelRatio };

    if (this.isConversionNeeded) {
      defaultParams.fm = 'jpg';
    }

    return defaultParams;
  }

  get finalParams() {
    return { ...this.defaultParams, ...this.args.params };
  }

  get queryParams() {
    return buildQueryParams(this.finalParams);
  }

  get imgSrc() {
    return `${this.args.url}?${this.queryParams}`;
  }
}
