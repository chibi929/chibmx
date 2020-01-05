<template>
  <div>Name: {{ fullName }} Message: {{ message }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { exampleStore } from '~/store'

interface User {
  firstName: string
  lastName: number
}

@Component
export default class ClassAPIComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User

  message: string = 'This is a message'

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`
  }

  mounted() {
    console.log('mounted')
    this.$axios
      .get('/test')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    console.log(this.$store.state.counter)
    console.log(exampleStore.counter)
  }
}
</script>
