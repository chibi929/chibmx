<template>
  <section class="section">
    <b-field label="Organization">
      <b-select @input="changeOrganization" placeholder="Select a name">
        <option v-for="(option, i) in orgs" :value="option" :key="i">
          {{ option }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Repository">
      <b-select v-model="selectedRepo" placeholder="Select a name">
        <option v-for="(option, i) in repos" :value="option" :key="i">
          {{ option }}
        </option>
      </b-select>
    </b-field>

    <p>Debug(orgs): {{ orgs }}</p>
    <p>Debug(repos): {{ repos }}</p>
    <p>Debug(selectedRepo): {{ selectedRepo }}</p>

    <b-button type="is-primary" @click="clickOK">
      OK
    </b-button>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { GitClient } from './git-client';

@Component
export default class Setting extends Vue {
  private orgs: string[] = [];
  private repos: string[] = [];

  /** v-model */
  private selectedRepo: string | null = null;

  private async created(): Promise<void> {
    this.$store.dispatch('loadToken');
    await this.$store.dispatch('updateOrganizations');
    this.orgs = this.$store.state.orgs;
  }

  private async changeOrganization(selectedOption: string): Promise<void> {
    await this.$store.dispatch('updateOrganizationRepositories', selectedOption);
    this.repos = this.$store.state.repos;
    this.selectedRepo = this.repos[0];
  }

  private clickOK() {
    console.log(this.selectedRepo);
    this.$buefy.dialog.confirm({
      message: `Your selected is ${this.selectedRepo}?`,
      onConfirm: () => this.$buefy.toast.open('User confirmed')
    });
  }
}
</script>
