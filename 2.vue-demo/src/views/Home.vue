<template>
  <AddTask v-if="showAddTask" @add-task="addTask" />
  <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-task="toggleTask" />
</template>

<script>
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import axios from "axios";
export default {
  name: "Home",
  components: {
    AddTask,
    Tasks,
  },
  props: {
    showAddTask: Boolean,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async deleteTask(id) {
      // console.log(`delete task:${id}`);
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    async toggleTask(id) {
      // console.log(`delete task:${id}`);

      const res = await axios.get(`http://localhost:5000/tasks/${id}`);
      const task = res.data;
      task.reminder = !task.reminder;
      await axios.patch(`http://localhost:5000/tasks/${id}`, task);
      this.tasks = this.tasks.map((t) => {
        if (t.id === id) {
          t = task;
        }
        return t;
      });
    },
    async addTask(task) {
      const res = await axios.post("http://localhost:5000/tasks", task);
      this.tasks.push(res.data);
    },
  },
  async created() {
    const res = await axios.get("http://localhost:5000/tasks");
    this.tasks = res.data;
  },
};
</script>