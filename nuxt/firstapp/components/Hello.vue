<template>
  <div>
    {{ fullName }}
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Hello extends Vue {
  message: string = 'This is a message from class component.';

  get fullName(): string {
    return `Chibi Kinoko`;
  }
}
</script>
