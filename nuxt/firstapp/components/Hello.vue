<template>
  <div>
    {{ fullName }}
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  name: 'Hello',

  data() {
    return {
      message: 'This is a message'
    };
  },

  computed: {
    fullName(): string {
      return `Chibi Kinoko`;
    }
  }
});
</script>
