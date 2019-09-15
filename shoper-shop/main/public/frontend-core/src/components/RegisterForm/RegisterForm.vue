<template>
  <validation-observer
    ref="observer"
    tag="form"
    class="register-form"
    v-slot="{ valid }"
    @submit.prevent="submitHandler"
  >
    <validation-provider rules="required" v-slot="{ errors }" slim>
      <div class="register-form__gender-picker">
        <base-radio id="register-gender-male" val="MALE" label="Male" v-model="gender" />
        <base-radio id="register-gender-female" val="FEMALE" label="Female" v-model="gender" />
        <p v-if="errors">{{ errors[0] }}</p>
      </div>
    </validation-provider>
    <validated-input
      validation-id="firstName"
      validation-rules="required"
      :validation-name="$t('register-form.firstName')"
      v-model="firstName"
      id="register-first-name"
      class="register-form__input"
      :label="$t('register-form.firstName')"
      type="text"
      required
    />
    <validated-input
      validation-id="lastName"
      validation-rules="required"
      :validation-name="$t('register-form.lastName')"
      v-model="lastName"
      id="register-last-name"
      class="register-form__input"
      :label="$t('register-form.lastName')"
      type="text"
      required
    />
    <validated-input
      validation-id="email"
      validation-rules="required|email"
      :validation-name="$t('register-form.email')"
      v-model="email"
      id="register-email"
      class="register-form__input"
      :label="$t('register-form.email')"
      type="email"
      required
    />
    <validated-input
      validation-id="password"
      validation-rules="required|min:6"
      :validation-name="$t('register-form.password')"
      v-model="password"
      id="register-password"
      class="register-form__input"
      :label="$t('register-form.password')"
      type="password"
      required
    />
    <validated-input
      validation-rules="required|password:password"
      :validation-name="$t('register-form.passwordConfirmName')"
      v-model="confirm"
      id="register-confirm"
      class="register-form__input"
      :label="$t('register-form.passwordConfirm')"
      type="password"
      required
    />
    <validation-provider
      :rules="{ required: { allowFalse: false }}"
      v-slot="{ errors }"
      slim
    >
      <base-checkbox
        v-model="agree"
        id="register-agree"
        class="register-form__input"
        :error="errors[0]"
        required
      >
        {{ $t('register-form.privacyPolicy') }}
      </base-checkbox>
    </validation-provider>
    <base-button
      class="register-form__submit-button"
      version="primary"
      :disabled="!valid"
      reversed
    >
      {{ $t('register-form.submitButton') }}
    </base-button>
  </validation-observer>
</template>

<script>
import BaseButton from '../Base/BaseButton/BaseButton';
import BaseCheckbox from '../Base/BaseCheckbox/BaseCheckbox';
import BaseRadio from '../Base/BaseRadio/BaseRadio';
import ValidatedInput from '../ValidatedInput/ValidatedInput';

export default {
  name: 'register-form',
  components: {
    BaseButton,
    BaseCheckbox,
    BaseRadio,
    ValidatedInput
  },
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirm: '',
      agree: false,
      gender: ''
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submit', {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        confirm: this.confirm,
        agree: this.agree,
        gender: this.gender
      });
    },
    setErrors(errors) {
      this.$refs.observer.setErrors(errors);
    }
  }
}
</script>

<style lang="scss">
.register-form {
  &__gender-picker {
    margin-bottom: 2rem;
  }

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