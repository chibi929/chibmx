<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start <b-icon icon="rocket" size="is-large" />"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author:
      <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  middleware: 'hoge'
})
export default class Inspire extends Vue {}
</script>
