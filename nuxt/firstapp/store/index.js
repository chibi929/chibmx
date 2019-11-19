export const state = () => ({
  token: ''
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};

export const actions = {
  setToken(context, token) {
    localStorage.setItem('GITHUB_TOKEN', token);
  },
  loadToken(context) {
    const token = localStorage.getItem('GITHUB_TOKEN') || '';
    context.commit('setToken', token);
  }
};
