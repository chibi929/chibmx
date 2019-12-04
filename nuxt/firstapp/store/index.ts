import { GitClient } from '~/pages/git-client';

export const state = () => ({
  /** ローカルストレージ */
  token: '',
  createCounts: 1,
  initialCounts: 1,
  /** GitHub データ */
  user: '',
  orgs: [],
  repos: [],
  /** 定数(今のところ) */
  columnTitles: ['To do', 'In progress', 'Resolved', 'Done']
});

export const mutations = {
  setToken(state: any, token: string) {
    state.token = token;
  },
  setCreateCounts(state: any, count: number) {
    state.createCounts = count;
  },
  setInitialCounts(state: any, count: number) {
    state.initialCounts = count;
  },
  setUser(state: any, userName: string) {
    state.user = userName;
  },
  setOrgs(state: any, orgs: string[]) {
    state.orgs = orgs;
  },
  setRepos(state: any, repos: string[]) {
    state.repos = repos;
  }
};

export const actions = {
  setToken({ commit }: any, token: string) {
    localStorage.setItem('GITHUB_TOKEN', token);
    commit('setToken', token);
    commit('setUser', '');
  },
  setCreateCounts({ commit }: any, count: number) {
    localStorage.setItem('CREATE_COUNTS', String(count));
    commit('setCreateCounts', count);
  },
  setInitialCounts({ commit }: any, count: number) {
    localStorage.setItem('INITIAL_COUNTS', String(count));
    commit('setInitialCounts', count);
  },
  loadLocalStorage({ commit }: any) {
    const token = localStorage.getItem('GITHUB_TOKEN') || '';
    commit('setToken', token);

    const createCounts = localStorage.getItem('CREATE_COUNTS') || 1;
    commit('setCreateCounts', Number(createCounts));

    const initialCounts = localStorage.getItem('INITIAL_COUNTS') || 1;
    commit('setInitialCounts', Number(initialCounts));
  },
  updateUser({ commit, state }: any) {
    if (state.user) {
      return;
    }

    const cli = new GitClient(state.token);
    return cli
      .fetchAuthUser()
      .then((response) => {
        const { data }: any = response;
        commit('setUser', data.login);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateOrganizations({ commit, state }: any) {
    if (state.orgs && state.orgs.length !== 0) {
      return;
    }

    const cli = new GitClient(state.token);
    return cli
      .fetchOrganization()
      .then((response) => {
        const orgs = response.data.map((obj: any) => obj.login).sort();
        commit('setOrgs', orgs);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateRepositories({ commit, state }: any, org: any) {
    const cli = new GitClient(state.token);
    const promise = org != null ? cli.fetchOrganizationRepository(org) : cli.fetchRepository();
    return promise
      .then((response) => {
        const repos = response.data.map((obj: any) => obj.name).sort();
        commit('setRepos', repos);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
