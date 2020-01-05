<template>
  <section class="section">
    <b-field label="Organization">
      <b-select v-model="selectedOrg" placeholder="Select a name" @input="changeOrganization">
        <option v-for="(option, i) in orgs" :key="i" :value="option">
          {{ option }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Repository">
      <b-select v-model="selectedRepo" placeholder="Select a name">
        <option v-for="(option, i) in repos" :key="i" :value="option">
          {{ option }}
        </option>
      </b-select>
    </b-field>

    <div class="columns">
      <div class="column is-3">
        <b-field label="Create counts">
          <b-numberinput v-model="createCounts" min="1" @input="reset" />
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Initial counts">
          <b-numberinput v-model="initialCounts" min="1" />
        </b-field>
      </div>
    </div>

    <b-field label="Select a date">
      <b-datepicker v-model="selectedDates" placeholder="Click to select..." range @input="changeDates" />
    </b-field>

    <template v-for="(_, i) in selectedDatesArray">
      <b-field :key="i" label="Select a date">
        <b-datepicker v-model="selectedDatesArray[i]" placeholder="Click to select..." range />
      </b-field>
    </template>

    <b-button type="is-primary" :disabled="requestButtonDisabled" @click="clickOK">
      OK
    </b-button>

    <p>Debug(orgs): {{ orgs }}</p>
    <p>Debug(repos): {{ repos }}</p>
    <p>Debug(selectedOrg): {{ selectedOrg }}</p>
    <p>Debug(selectedRepo): {{ selectedRepo }}</p>
    <p>Debug(createCounts): {{ createCounts }}</p>
    <p>Debug(initialCounts): {{ initialCounts }}</p>
    <p>Debug(selectedDates): {{ selectedDates }}</p>
    <p>Debug(selectedDatesArray): {{ selectedDatesArray }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import { GitClient } from './git-client';

@Component
export default class Main extends Vue {
  private user: string = '';
  private orgs: string[] = [];
  private repos: string[] = [];

  /** v-model */
  private selectedOrg: string | null = null;
  private selectedRepo: string | null = null;
  private createCounts: number = 1;
  private initialCounts: number = 1;
  private selectedDates: Date[] | null = null;
  private selectedDatesArray: any[][] = [];

  private async created(): Promise<void> {
    this.$store.dispatch('loadLocalStorage');
    const token = this.$store.state.token;
    if (!token) {
      this.$router.push('Setting');
      this.$buefy.toast.open({ message: `GitHub トークンを登録してください`, position: 'is-bottom', type: 'is-danger' });
      return;
    }

    await this.$store.dispatch('updateUser');
    const user = this.$store.state.user;
    if (!user) {
      this.$router.push('Setting');
      this.$buefy.toast.open({ message: `GitHub ユーザーが取得できませんでした`, position: 'is-bottom', type: 'is-danger' });
    }

    this.user = user;
    this.createCounts = this.$store.state.createCounts;
    this.initialCounts = this.$store.state.initialCounts;
    await this.$store.dispatch('updateOrganizations');
    this.orgs = [this.user].concat(this.$store.state.orgs);
  }

  private reset(): void {
    this.selectedDates = null;
    this.selectedDatesArray = [];
  }

  private get requestButtonDisabled(): boolean {
    const datesArray = [this.selectedDates as Date[]].concat(this.selectedDatesArray);
    return (
      this.selectedOrg == null ||
      this.selectedRepo == null ||
      this.selectedDates == null ||
      this.createCounts !== datesArray.length
    );
  }

  private async changeOrganization(selectedOption: string): Promise<void> {
    const reqOrg = selectedOption === this.user ? null : selectedOption;
    await this.$store.dispatch('updateRepositories', reqOrg);
    this.repos = this.$store.state.repos;
    this.selectedRepo = this.repos[0];
  }

  private changeDates(dates: Date[]): void {
    this.selectedDatesArray.length = 0;
    const startDate = moment(dates[0]);
    const endDate = moment(dates[1]);
    const diff = endDate.diff(startDate, 'days') + 1;

    for (let i = 0; i < this.createCounts - 1; i++) {
      startDate.add(diff, 'days');
      endDate.add(diff, 'days');
      this.selectedDatesArray.push([startDate.toDate(), endDate.toDate()]);
    }
  }

  private clickOK() {
    if (this.requestButtonDisabled) {
      this.$buefy.toast.open({
        message: `必要なパラメータが揃っていません`,
        position: 'is-bottom',
        type: 'is-danger'
      });
      return;
    }
    this.$store.dispatch('setCreateCounts', this.createCounts);
    this.$store.dispatch('setInitialCounts', this.initialCounts);

    const datesArray = [this.selectedDates as Date[]].concat(this.selectedDatesArray);
    const projectTitles = datesArray.map((dates, idx) => {
      const startDate = moment(dates[0]);
      const endDate = moment(dates[1]);
      return `sp${this.initialCounts + idx}(${startDate.format('YYYY.MM.DD')}-${endDate.format('YYYY.MM.DD')})`;
    });

    this.$buefy.dialog.confirm({
      message: `${projectTitles.join('\r\n')}`,
      onConfirm: this.callbackOnConfirm(projectTitles)
    });
  }

  private callbackOnConfirm(projectTitles: string[]): () => void {
    return () => {
      projectTitles.reduce<any>((acc: Promise<void>, cur: string) => {
        return acc.then(() => {
          return this.createProjectRelations(cur)
            .then(() => {
              this.$buefy.toast.open(`${cur} を作成しました`);
            })
            .catch(() => {
              this.$buefy.toast.open({
                message: `プロジェクト登録に失敗しました`,
                position: 'is-bottom',
                type: 'is-danger'
              });
            });
        });
      }, Promise.resolve());
    };
  }

  private async createProjectRelations(projectTitle: string): Promise<void> {
    const token = this.$store.state.token as string;
    const cli = new GitClient(token);

    const { data }: any = await cli.createRepositoryProject(this.selectedOrg!, this.selectedRepo!, projectTitle);
    const columnTitles = this.$store.state.columnTitles as string[];
    columnTitles.reduce<any>((acc: Promise<void>, cur: string) => {
      return acc.then(() => {
        return cli.createProjectColumn(data.id, cur).catch(() => {
          this.$buefy.toast.open({
            message: `カラム登録に失敗しました`,
            position: 'is-bottom',
            type: 'is-danger'
          });
        });
      });
    }, Promise.resolve());
  }
}
</script>
