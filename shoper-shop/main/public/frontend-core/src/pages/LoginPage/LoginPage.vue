<template>
  <div class="login-page">
    <div class="login-page__columns">
      <div class="login-page__column">
        <h3 class="login-page__headline">{{ $t('login-page.loginHeadline') }}</h3>
        <login-form @submit="loginSubmitHandler" />
      </div>
      <div
        ref="registerColumn"
        class="login-page__column"
      >
        <h3 class="login-page__headline">{{ $t('login-page.registerHeadline') }}</h3>
        <p class="login-page__subline">{{ $t('login-page.registerSubline') }}</p>
        <base-button
          v-if="!registerOpened"
          class="login-page__expand-button"
          type="button"
          version="primary"
          reversed
          @click="expandButtonClickHandler"
        >
          {{ $t('login-page.registerExpand') }}
        </base-button>
        <register-form
          v-if="registerOpened"
          @submit="registerSubmitHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { scrollToElement } from '../../utils/js/scrollToElement';
import BaseButton from '../../components/Base/BaseButton/BaseButton';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default {
  name: 'login-page',
  components: {
    BaseButton,
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      registerOpened: false
    };
  },
  methods: {
    loginSubmitHandler(data) {
      console.log('Signing in', data);
    },
    registerSubmitHandler(data) {
      console.log('Registering new user', data);
    },
    expandButtonClickHandler() {
      this.registerOpened = true;

      this.$nextTick(() => {
        scrollToElement(this.$refs.registerColumn);
      })
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/media';

.login-page {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1200px;

  @include media-tablet-up {
    padding-top: 4rem;
  }

  &__columns {
    @include media-tablet-up {
      margin: 0;
      display: flex;
      justify-content: space-between;
    }
  }

  &__column {
    width: 100%;

    @include media-tablet-up {
      width: 50%;
    }

    &:first-child {
      padding-bottom: 2.5rem;

      @include media-tablet-up {
        padding-bottom: 0;
        padding-right: 2rem;
        border-right: 1px solid $colorMercury;
      }

      @include media-laptop-up {
        padding-right: 10rem;
      }
    }

    &:last-child {
      padding-top: 2.5rem;
      border-top: 1px solid $colorMercury;

      @include media-tablet-up {
        padding-top: 0;
        padding-left: 2rem;
        border-top: none;
      }

      @include media-laptop-up {
        padding-left: 10rem;
      }
    }
  }

  &__headline {
    margin-bottom: 2.5rem;
    font-size: $fontSizeMedium;
    font-weight: $fontWeightBold;
  }

  &__subline {
    margin-bottom: 2.5rem;
    line-height: 1.375;

    @include media-tablet-up {
      line-height: 1.5;
    }
  }

  &__expand-button {
    width: 100%;
    height: 5rem;
    margin-bottom: 2.5rem;
  }
}
</style>