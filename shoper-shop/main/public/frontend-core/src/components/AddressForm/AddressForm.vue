<template>
  <validation-observer
    ref="observer"
    class="address-form"
    tag="div"
  >
    <validated-input
      validation-id="streetName"
      validation-rules="required"
      :validation-name="$t('global.form.street_name.label')"
      v-model="streetName"
      :id="`${id}-address-form-street-name`"
      class="address-form__input"
      :label="$t('global.form.street_name.label')"
      name="streetName"
      type="text"
      required
    />
    <validated-input
      validation-id="streetNr"
      validation-rules="required"
      :validation-name="$t('global.form.street_nr.label')"
      v-model="streetNr"
      :id="`${id}-address-form-street-nr`"
      class="address-form__input"
      :label="$t('global.form.street_nr.label')"
      name="streetNr"
      type="text"
      required
    />
    <base-input
      v-model="additionalAddress"
      :id="`${id}-address-form-additional-address`"
      class="address-form__input"
      :label="$t('global.form.additional_address.label')"
      name="additionalAddress"
      type="text"
    />
    <validated-input
      validation-id="zipCode"
      validation-rules="required"
      :validation-name="$t('global.form.zip_code.label')"
      v-model="zipCode"
      :id="`${id}-address-form-zip-code`"
      class="address-form__input"
      :label="$t('global.form.zip_code.label')"
      name="zipCode"
      type="text"
      required
    />
    <validated-input
      validation-id="town"
      validation-rules="required"
      :validation-name="$t('global.form.town.label')"
      v-model="town"
      :id="`${id}-address-form-town`"
      class="address-form__input"
      :label="$t('global.form.town.label')"
      name="town"
      type="text"
      required
    />
    <base-select
      :id="`${id}-address-form-country`"
      class="address-form__input"
      :label="$t('global.form.country.label')"
      :options="countries"
      v-model="country"
    >
      <template v-slot:value="{ label, value }">
        <div class="address-form__country">
          <img
            class="address-form__country-flag"
            :src="`https://www.countryflags.io/${value}/flat/64.png`"
            :alt="label"
          />
          {{ label }}
        </div>
      </template>
      <template v-slot:option="{ label, value }">
        <div class="address-form__country">
          <img
            class="address-form__country-flag"
            :src="`https://www.countryflags.io/${value}/flat/64.png`"
            :alt="label"
          />
          {{ label }}
        </div>
      </template>
    </base-select>
  </validation-observer>
</template>

<script>
import BaseInput from '../../components/Base/BaseInput/BaseInput';
import BaseSelect from '../../components/Base/BaseSelect/BaseSelect';
import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';

export default {
  name: 'address-form',
  components: {
    BaseInput,
    BaseSelect,
    ValidatedInput
  },
  props: {
    id: String
  },
  data() {
    return {
      streetNr: '',
      streetName: '',
      additionalAddress: '',
      zipCode: '',
      town: '',
      country: '',
      countries: [
        { value: 'pl', label: 'Poland' },
        { value: 'de', label: 'Germany' },
        { value: 'ch', label: 'Switzerland' },
        { value: 'at', label: 'Austria' },
        { value: 'fr', label: 'France' },
        { value: 'nl', label: 'Netherlands' },
        { value: 'se', label: 'Sweden' },
        { value: 'gb', label: 'Great Britain'}
      ]
    };
  },
  methods: {
    setValues(values) {
      this.town = values.town || '';
      this.country = values.country || '';
      this.zipCode = values.zipCode || '';
      this.streetNr = values.streetNr || '';
      this.streetName = values.streetName || '';
      this.additionalAddress = values.additionalAddress || '';
    }
  }
};
</script>

<style lang="scss">
.address-form {
  &__input {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__country {
    display: flex;
    align-items: center;
  }

  &__country-flag {
    display: block;
    width: auto;
    height: 20px;
    margin-right: 1rem;
  }
}
</style>
