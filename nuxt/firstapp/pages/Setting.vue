<template>
  <section class="section">
    <b-field label="Token">
      <b-input v-model="token" placeholder="Token..." />
    </b-field>
    <b-button type="is-primary" @click="save">
      保存
    </b-button>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { GitClient } from './git-client';

@Component
export default class Setting extends Vue {
  private token: string = '';

  get fullName(): string {
    return `Chibi Kinoko`;
  }

  private created() {
    this.$store.dispatch('loadLocalStorage');
    this.token = this.$store.state.token;
  }

  private save() {
    this.$buefy.dialog.confirm({
      message: `ブラウザにトークンを保存します`,
      onConfirm: () => {
        this.$store.dispatch('setToken', this.token);
        this.$buefy.toast.open('保存しました');
      }
    });
  }
}
</script>
