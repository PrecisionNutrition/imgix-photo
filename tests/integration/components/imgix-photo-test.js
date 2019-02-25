import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const actualImgUrl = 'https://es-dev.imgix.net/profiles/testimonials/2019-02/6de49b21-8c89-43ca-958e-a9ce3918b528/731b9e53-5419-4f73-82b7-639cb194f2ba.jpeg';

module('Integration | Component | imgix-photo', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as expected', async function(assert) {
    this.setProperties({
      alt: 'Test!',
      url: actualImgUrl,
      w: 300,
      h: 400,
      fit: 'crop',
      sepia: 88
    });


    let dpr = window.devicePixelRatio;

    let expectedSrc = `${actualImgUrl}?dpr=${dpr}&w=300&h=400&fit=crop&sepia=88`;

    await render(hbs`{{imgix-photo
      url=url
      alt=alt
      params=(hash
        w=w
        h=h
        fit=fit
        sepia=sepia
      )
      class="SomeClass"
    }}`);

    assert.dom('img').hasAttribute('width', '300');

    assert.dom('img').hasAttribute('height', '400');

    assert.dom('img').hasAttribute('alt', 'Test!');

    assert.dom('img').hasAttribute('src', expectedSrc);

    assert.dom('img').hasClass('SomeClass');
  });
});
