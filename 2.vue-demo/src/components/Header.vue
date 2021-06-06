<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-if="homePage"
      @click="onClick"
      :text="showAddTask ? 'Hide Form' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import Button from "./Button";
export default {
  name: "Header",
  //   props: ["title"],
  props: {
    //   title:String,
    title: {
      type: String,
      default: "Hello World",
    },
    showAddTask: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("btn-clicked");
    },
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scope>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>