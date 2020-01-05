import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ stateFactory: true, namespaced: true, name: 'example' })
export default class MyModule extends VuexModule {
  counter = 0

  @Mutation
  increment() {
    this.counter++
  }
}
