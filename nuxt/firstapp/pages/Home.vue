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

    <b-field label="Select a date">
      <b-datepicker placeholder="Click to select..." v-model="selectedDates" range />
    </b-field>
    <template v-for="(_, i) in selectedDatesArray">
      <b-field label="Select a date" :key="i">
        <b-datepicker placeholder="Click to select..." v-model="selectedDatesArray[i]" range />
      </b-field>
    </template>

    <b-button type="is-primary" @click="clickOK">
      OK
    </b-button>

    <p>Debug(orgs): {{ orgs }}</p>
    <p>Debug(repos): {{ repos }}</p>
    <p>Debug(selectedRepo): {{ selectedRepo }}</p>
    <p>Debug(selectedDates): {{ selectedDates }}</p>
    <p>Debug(selectedDatesArray): {{ selectedDatesArray }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import { GitClient } from './git-client';

@Component
export default class Setting extends Vue {
  private orgs: string[] = [];
  private repos: string[] = [];

  /** v-model */
  private selectedRepo: string | null = null;
  private selectedDates: any[] | null = null;
  private selectedDatesArray: any[][] = [];

  private async created(): Promise<void> {
    this.$store.dispatch('loadToken');
    await this.$store.dispatch('updateOrganizations');
    this.orgs = this.$store.state.orgs;
    if (!this.orgs || !this.orgs.length) {
      await this.$store.dispatch('updateRepositories', null);
      this.repos = this.$store.state.repos;
      this.selectedRepo = this.repos[0];
    }
  }

  private async changeOrganization(selectedOption: string): Promise<void> {
    await this.$store.dispatch('updateRepositories', selectedOption);
    this.repos = this.$store.state.repos;
    this.selectedRepo = this.repos[0];
  }

  private clickOK() {
    this.selectedDatesArray.push([new Date('2019/11/1'), new Date('2019/11/2')]);

    const a = moment(new Date('2019/11/3'));
    const b = moment(new Date('2019/11/4'));
    a.add(7, 'days');
    b.add(7, 'days');

    this.$buefy.dialog.confirm({
      message: `Your selected is ${this.selectedRepo}?`,
      onConfirm: () => this.$buefy.toast.open('User confirmed')
    });
  }
}
</script>
