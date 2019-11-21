import { GitClient } from '~/pages/git-client';

export const state = () => ({
  token: '',
  orgs: [],
  repos: []
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
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
  updateOrganizationRepositories(context, org) {
    const cli = new GitClient(context.state.token);
    return cli
      .fetchOrganizationRepository(org)
      .then((response) => {
        const repos = response.data.map((obj) => obj.name).sort();
        context.commit('setRepos', repos);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
