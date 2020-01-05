import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state: any) {
    state.counter++
  }
}
