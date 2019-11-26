import { GitClient } from '~/pages/git-client';

export const state = () => ({
  token: '',
  user: '',
  orgs: [],
  repos: [],
  columnTitles: ['To do', 'In progress', 'Resolved', 'Done']
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
    state.user = '';
  },
  setUser(state, userName) {
    state.user = userName;
  },
  setOrgs(state, orgs) {
    state.orgs = orgs;
  },
  setRepos(state, repos) {
    state.repos = repos;
  }
};

export const actions = {
  setToken(context, token) {
    localStorage.setItem('GITHUB_TOKEN', token);
  },
  loadToken(context) {
    const token = localStorage.getItem('GITHUB_TOKEN') || '';
    context.commit('setToken', token);
  },
  updateUser(context) {
    if (context.state.user) {
      return;
    }

    const cli = new GitClient(context.state.token);
    return cli
      .fetchAuthUser()
      .then((response) => {
        const { data } = response;
        console.log(data.login);
        context.commit('setUser', data.login);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateOrganizations(context) {
    if (context.state.orgs && context.state.orgs.length !== 0) {
      return;
    }

    const cli = new GitClient(context.state.token);
    return cli
      .fetchOrganization()
      .then((response) => {
        const orgs = response.data.map((obj) => obj.login).sort();
        context.commit('setOrgs', orgs);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateRepositories(context, org) {
    const cli = new GitClient(context.state.token);
    const promise = org != null ? cli.fetchOrganizationRepository(org) : cli.fetchRepository();
    return promise
      .then((response) => {
        const repos = response.data.map((obj) => obj.name).sort();
        context.commit('setRepos', repos);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
