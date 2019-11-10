<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        Open source on
        <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
      </card>

      <card title="Responsive" icon="cellphone-link">
        <b class="has-text-grey">
          Every
        </b>
        component is responsive
      </card>

      <card title="Modern" icon="alert-decagram">
        Built with
        <a href="https://vuejs.org/">
          Vue.js
        </a>
        and
        <a href="http://bulma.io/">
          Bulma
        </a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front">
        No other internal dependency
      </card>
    </div>

    <h2>api response result : {{ response }}</h2>
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>
