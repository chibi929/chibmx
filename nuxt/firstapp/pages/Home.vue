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

    <div class="columns">
      <div class="column is-2">
        <b-field label="Create counts">
          <b-numberinput v-model="createCounts" min="1" />
        </b-field>
      </div>
      <div class="column is-2">
        <b-field label="Initial counts">
          <b-numberinput v-model="initialCounts" min="1" />
        </b-field>
      </div>
    </div>

    <b-field label="Select a date">
      <b-datepicker @input="changeDates" placeholder="Click to select..." v-model="selectedDates" range />
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
  private initialCounts: number = 1;
  private createCounts: number = 1;
  private selectedDates: Date[] | null = null;
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

  private changeDates(dates: Date[]): void {
    this.selectedDatesArray.length = 0;
    const startDate = moment(dates[0]);
    const endDate = moment(dates[1]);
    const diff = endDate.diff(startDate, 'days') + 1;

    for (let i = 0; i < this.createCounts; i++) {
      startDate.add(diff, 'days');
      endDate.add(diff, 'days');
      this.selectedDatesArray.push([startDate.toDate(), endDate.toDate()]);
    }
  }

  private clickOK() {
    this.$buefy.dialog.confirm({
      message: `Your selected is ${this.selectedRepo}?`,
      onConfirm: () => this.$buefy.toast.open('User confirmed')
    });
  }
}
</script>
