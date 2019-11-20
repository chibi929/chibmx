<template>
  <section class="section">
    <p>Debug(orgs): {{ orgs }}</p>
    <p>Debug(repos): {{ repos }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { GitClient } from './git-client';

@Component
export default class Setting extends Vue {
  private orgs: string[] = [];
  private repos: string[] = [];

  private async created() {
    this.$store.dispatch('loadToken');
    await this.$store.dispatch('updateOrganizations');
    await this.$store.dispatch('updateOrganizationRepositories', 'xxxxxx');
    this.orgs = this.$store.state.orgs;
    this.repos = this.$store.state.repos;
  }
}
</script>
