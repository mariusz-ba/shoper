<template>
  <div class="account-page">
    <template v-if="isAuthenticated">
      <h1>Welcome on your account</h1>
      <p>Your id: {{ user.id }}</p>
      <p>Your email: {{ user.email }}</p>
      <button @click="signOutClickHandler">Sign out</button>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { store } from '../../store/store';
import { AuthActionsTypes } from '../../store/modules/auth/authActions';

export default {
  name: 'account-page',
  computed: {
    ...mapState('auth', ['user', 'isAuthenticated'])
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next({ name: store.state.routesNames.loginPage.name })
    }
  },
  methods: {
    ...mapActions('auth', {
      signOut: AuthActionsTypes.SIGN_OUT
    }),
    signOutClickHandler() {
      this.signOut()
        .then(() => {
          this.$router.push('/');
        });
    }
  }
};
</script>

<style lang="scss">
.account-page {
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
}
</style>
