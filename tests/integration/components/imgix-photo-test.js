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
      sepia: 88,
    });

    let dpr = window.devicePixelRatio;

    let expectedSrc = `${actualImgUrl}?dpr=${dpr}&fit=crop&h=400&sepia=88&w=300`;

    await render(hbs`<ImgixPhoto
      @url={{url}}
      @alt={{alt}}
      @params={{hash
        w=w
        h=h
        fit=fit
        sepia=sepia
      }}
      class="SomeClass"
    />`);

    assert.dom('img').hasAttribute('width', '300');

    assert.dom('img').hasAttribute('height', '400');

    assert.dom('img').hasAttribute('alt', 'Test!');

    assert.dom('img').hasAttribute('src', expectedSrc);

    assert.dom('img').hasClass('SomeClass');
  });

  test('can exclude width and height attributes even when params set', async function(assert) {
    this.setProperties({
      alt: 'Test!',
      url: actualImgUrl,
      w: 300,
      h: 400,
      fit: 'crop',
      sepia: 88,
    });


    let dpr = window.devicePixelRatio;

    let expectedSrc = `${actualImgUrl}?dpr=${dpr}&fit=crop&h=400&sepia=88&w=300`;

    await render(hbs`<ImgixPhoto
      @autoSetDimensions={{false}}
      @url={{url}}
      @alt={{alt}}
      @params={{hash
        w=w
        h=h
        fit=fit
        sepia=sepia
      }}
      class="SomeClass"
    />`);

    assert.dom('img').doesNotHaveAttribute('width', '300');

    assert.dom('img').doesNotHaveAttribute('height', '400');

    assert.dom('img').hasAttribute('src', expectedSrc);
  });

  test('converts HEIC images auto-magically', async function(assert) {
    let heicUrl = 'http://example.com/image.heic';

    this.setProperties({
      alt: 'Test!',
      url: heicUrl,
      w: 300,
      h: 400,
      fit: 'crop',
      sepia: 88,
    });


    let dpr = window.devicePixelRatio;

    let expectedSrc = `${heicUrl}?dpr=${dpr}&fit=crop&fm=jpg&h=400&sepia=88&w=300`;

    await render(hbs`<ImgixPhoto
      @autoSetDimensions={{false}}
      @url={{url}}
      @alt={{alt}}
      @params={{hash
        w=w
        h=h
        fit=fit
        sepia=sepia
      }}
      class="SomeClass"
    />`);

    assert.dom('img').hasAttribute('src', expectedSrc);
  });

  test('does not stomp on `fm` if provided for a HEIC image', async function(assert) {
    let heicUrl = 'http://example.com/image.heic';

    this.setProperties({
      alt: 'Test!',
      url: heicUrl,
      w: 300,
      h: 400,
      fit: 'crop',
      fm: 'png',
      sepia: 88,
    });

    let dpr = window.devicePixelRatio;

    let expectedSrc = `${heicUrl}?dpr=${dpr}&fit=crop&fm=png&h=400&sepia=88&w=300`;

    await render(hbs`<ImgixPhoto
      @autoSetDimensions={{false}}
      @url={{url}}
      @alt={{alt}}
      @params={{hash
        w=w
        h=h
        fit=fit
        fm=fm
        sepia=sepia
      }}
      class="SomeClass"
    />`);

    assert.dom('img').hasAttribute('src', expectedSrc);
  });
});
