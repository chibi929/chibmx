<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="First Step" icon="github-circle">
        Create <strong>Personal access tokens</strong> on
        <span>
          <a href="https://github.com/settings/tokens">
            GitHub
          </a>
          .
        </span>
        <br />
        The required scope is <strong>repo</strong>.
      </card>

      <card title="Second Step" icon="settings">
        Save tokens to this app on
        <nuxt-link to="Setting">
          Setting
        </nuxt-link>
        page.
      </card>

      <card title="Third Step" icon="rocket">
        <nuxt-link to="Main">
          Create GitHub project!
        </nuxt-link>
      </card>
    </div>
    <div class="columns is-mobile">
      <card title="Note" icon="alert">
        <strong>Manage automation</strong>
        settings is manually.
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card';

export default {
  name: 'HomePage',

  components: {
    Card
  },
  data() {
    return {
      response: null
    };
  },
  mounted() {
    this.$axios
      .$get('/api/test')
      .then((response) => {
        this.response = response.test;
        console.log(this.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>
