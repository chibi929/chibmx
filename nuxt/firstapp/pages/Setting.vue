<template>
  <section class="section">
    <b-field label="Token">
      <b-input v-model="token" placeholder="Token..." />
    </b-field>
    <b-button type="is-primary" @click="save">
      保存
    </b-button>

    <h2 class="title is-3 has-text-grey">
      "Just start"
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author:
      <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>

    <p>Debug: {{ fullName }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {
  private token: string = '';

  get fullName(): string {
    return `Chibi Kinoko ${this.token}`;
  }

  private created() {
    this.token = localStorage.getItem('GITHUB_TOKEN') || '';
  }

  private save() {
    localStorage.setItem('GITHUB_TOKEN', this.token);
  }
}
</script>
