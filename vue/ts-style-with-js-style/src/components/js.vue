<template>
  <div class="js">
    <h1>{{ msg }}</h1>
    <p>Fullname: {{ fullName }}</p>
  </div>
</template>

<script>
export default {
  name: "JavaScript",
  data() {
    return {
      msg: "このコンポーネントはJS記述のコンポーネントです。"
    };
  },
  props: ["user"],
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  mounted() {
    console.log("JS Mounted");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
