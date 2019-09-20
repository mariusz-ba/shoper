<template>
  <validation-observer
    ref="observer"
    tag="form"
    class="login-form"
    @submit.prevent="submitHandler"
  >
    <validated-input
      validation-id="email"
      validation-rules="required|email"
      :validation-name="$t('login-form.emailLabel')"
      v-model="email"
      id="login-email"
      class="login-form__input"
      :label="$t('login-form.emailLabel')"
      type="email"
      required
    />
    <validated-input
      validation-id="password"
      validation-rules="required"
      :validation-name="$t('login-form.passwordLabel')"
      v-model="password"
      id="login-password"
      class="login-form__input"
      :label="$t('login-form.passwordLabel')"
      type="password"
      required
    />
    <base-button
      class="login-form__submit-button"
      version="primary"
      reversed
    >
      {{ $t('login-form.submitButton') }}
    </base-button>
  </validation-observer>
</template>

<script>
import BaseButton from '../Base/BaseButton/BaseButton';
import ValidatedInput from '../ValidatedInput/ValidatedInput';

export default {
  name: 'login-page',
  components: {
    BaseButton,
    ValidatedInput
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitHandler() {
      this.$refs.observer.validate()
        .then(valid => {
          if (valid) {
            this.submitForm();
          }
        });
    },
    submitForm() {
      this.$emit('submit', {
        email: this.email,
        password: this.password
      });
    },
    setErrors(errors) {
      this.$refs.observer.setErrors(errors);
    }
  }
};
</script>

<style lang="scss">
.login-form {
  &__input {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__submit-button {
    width: 100%;
    height: 5rem;
    margin-top: 2.5rem;
  }
}
</style>