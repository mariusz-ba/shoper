<template>
  <div class="account-page">
    <h1>Welcome on your account</h1>
    <p>Your id: {{ user.id }}</p>
    <p>Your email: {{ user.email }}</p>
    <button @click="signOutClickHandler">Sign out</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { AuthActionsTypes } from '../../store/modules/auth/authActions';

export default {
  name: 'account-page',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', {
      signOut: AuthActionsTypes.SIGN_OUT
    }),
    signOutClickHandler() {
      this.signOut();
    }
  }
};
</script>
