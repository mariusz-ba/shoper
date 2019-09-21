<template>
  <validation-observer
    ref="observer"
    tag="form"
    class="register-form"
    @submit.prevent="submitHandler"
  >
    <validation-provider rules="required" v-slot="{ errors }" slim>
      <gender-picker
        class="register-form__input"
        :label="$t('global.form.gender.label')"
        v-model="gender"
        :error="errors[0]"
      />
    </validation-provider>
    <validated-input
      validation-id="firstName"
      validation-rules="required"
      :validation-name="$t('global.form.first_name.label')"
      v-model="firstName"
      id="register-first-name"
      class="register-form__input"
      :label="$t('global.form.first_name.label')"
      type="text"
      required
    />
    <validated-input
      validation-id="lastName"
      validation-rules="required"
      :validation-name="$t('global.form.last_name.label')"
      v-model="lastName"
      id="register-last-name"
      class="register-form__input"
      :label="$t('global.form.last_name.label')"
      type="text"
      required
    />
    <validated-input
      validation-id="email"
      validation-rules="required|email"
      :validation-name="$t('global.form.email.label')"
      v-model="email"
      id="register-email"
      class="register-form__input"
      :label="$t('global.form.email.label')"
      type="email"
      required
    />
    <validated-input
      validation-id="password"
      validation-rules="required|min:6"
      :validation-name="$t('global.form.password.label')"
      v-model="password"
      id="register-password"
      class="register-form__input"
      :label="$t('global.form.password.label')"
      type="password"
      required
    />
    <validated-input
      validation-rules="required|password:password"
      :validation-name="$t('global.form.password_confirm.name')"
      v-model="confirm"
      id="register-confirm"
      class="register-form__input"
      :label="$t('global.form.password_confirm.label')"
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
        {{ $t('register-form.privacy') }}
      </base-checkbox>
    </validation-provider>
    <base-button
      class="register-form__submit-button"
      version="primary"
      reversed
    >
      {{ $t('register-form.submit') }}
    </base-button>
  </validation-observer>
</template>

<script>
import BaseButton from '../Base/BaseButton/BaseButton';
import BaseCheckbox from '../Base/BaseCheckbox/BaseCheckbox';
import ValidatedInput from '../ValidatedInput/ValidatedInput';
import GenderPicker from '../GenderPicker/GenderPicker';

export default {
  name: 'register-form',
  components: {
    BaseButton,
    BaseCheckbox,
    ValidatedInput,
    GenderPicker
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