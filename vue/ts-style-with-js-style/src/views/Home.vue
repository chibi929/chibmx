<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <JavaScript :user="{ firstName: 'Taro', lastName: 'Yamada' }" />
    <TypeScript :user="{ firstName: 'Taro', lastName: 'Yamada' }" />
  </div>
</template>

<script>
// @ is an alias to /src
import TypeScript from "@/components/ts.vue";
import JavaScript from "@/components/js.vue";

export default {
  name: "home",
  components: {
    TypeScript,
    JavaScript
  }
};
</script>
