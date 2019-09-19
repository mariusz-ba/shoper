import throttle from 'lodash/throttle';
import './LazyImage.scss';

function getPropertyFromStyles(node, property) {
  if (node.data.normalizedStyle && node.data.normalizedStyle[property]) {
    return node.data.normalizedStyle[property];
  }

  if (node.data.staticStyle && node.data.staticStyle[property]) {
    return node.data.staticStyle[property];
  }

  return undefined;
}

export default {
  name: 'lazy-image',
  props: {
    // Use only when rendering in HTML not in Vue component
    imageSrc: String,
    // Image dimensions are needed to calculate correct loader size based on
    // image aspect ratio. By default loader will be a rectangle.
    imageWidth: {
      type: Number,
      default: 1
    },
    imageHeight: {
      type: Number,
      default: 1
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      styles: {},
      canBeLoaded: false,
      loaded: false,
      error: false
    }
  },
  render(h) {
    const vnode = this.$slots.default[0];
    const vnodeLoader = this.$slots.loader ? this.$slots.loader[0] : undefined;
    const vnodeError = this.$slots.error ? this.$slots.error[0] : undefined;

    // Clone vnode properties that will be overrided depending on local
    // component data.
    const vnodeClone = Object.assign({}, vnode);
    vnodeClone.data = Object.assign({}, vnode.data);
    vnodeClone.data.attrs = Object.assign({}, vnode.data.attrs);
    vnodeClone.data.staticStyle = Object.assign({}, vnode.data.staticStyle);
    vnodeClone.data.normalizedStyle = Object.assign({}, vnode.data.normalizedStyle);
    
    const listeners = vnodeClone.data.on || {};

    vnodeClone.data.on = Object.assign({}, listeners, {
      load: () => {
        this.imageLoadSuccess();

        if (listeners.load) {
          listeners.load();
        }
      },
      error: () => {
        this.imageLoadError();

        if (listeners.error) {
          listeners.error();
        }
      }
    });

    const display = getPropertyFromStyles(vnode, 'display');
    const height = getPropertyFromStyles(vnode, 'height');

    vnodeClone.data.attrs.src = this.canBeLoaded ? (this.imageSrc || vnode.data.attrs.src) : undefined;
    vnodeClone.data.staticStyle.display = this.loaded ? display : 'none';
    vnodeClone.data.normalizedStyle.display = this.loaded ? display : 'none';

    const renderLoader = !this.loaded && !this.error;
    const renderError = !renderLoader && this.error;
    const renderPadding = [undefined, '', 'auto', 'inherit', 'initial'].includes(height) && this.styles;

    return h(this.tag,
      {
        attrs: { class: 'lazy-image' },
        style: Object.assign({}, this.styles, {
          paddingBottom: renderPadding ? this.styles.paddingBottom : undefined
        })
      },
      [
        vnodeClone,
        renderLoader ? (vnodeLoader || h('span', { attrs: { class: 'lazy-image__loader' }})) : null,
        renderError ? (vnodeError || h('span', { attrs: { class: 'lazy-image__error' }})) : null
      ]
    );
  },
  created() {
    if (this.imageWidth && this.imageHeight) {
      this.styles = {
        paddingBottom: `${this.imageHeight / this.imageWidth * 100}%`
      };
    }
  },
  mounted() {
    this.scrollHandlerThrottled = throttle(this.scrollHandler, 300);
    this.scrollHandlerThrottled();
    window.addEventListener('scroll', this.scrollHandlerThrottled);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandlerThrottled);
  },
  methods: {
    imageLoadSuccess() {
      this.styles = null;
      this.loaded = true;
    },
    imageLoadError() {
      this.error = true;
    },
    scrollHandler() {
      const elementRect = this.$el.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const elementBottom = elementRect.bottom + window.pageYOffset;

      const range = [
        window.pageYOffset - window.innerHeight / 2,
        window.pageYOffset + window.innerHeight * 1.5
      ];

      if (
        elementTop >= range[0] && elementTop <= range[1] ||
        elementBottom >= range[0] && elementBottom <= range[1]
      ) {
        this.canBeLoaded = true;
        window.removeEventListener('scroll', this.scrollHandlerThrottled);
      }
    } 
  }
};
