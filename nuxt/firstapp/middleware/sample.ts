import { Store } from 'vuex';

export default async function({ store }: any) {
  const { state, dispatch }: Store<any> = store;
  dispatch('loadLocalStorage');

  const { token } = state;
  if (!token) {
    return;
  }

  dispatch('updateUser');
  dispatch('updateOrganizations');
}
