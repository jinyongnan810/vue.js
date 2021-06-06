<template>
  <div class="container">
    <Header
      @btn-clicked="showAddTask = !showAddTask"
      :showAddTask="showAddTask"
      title="Task Tracker"
    />
    <AddTask v-if="showAddTask" @add-task="addTask" />
    <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-task="toggleTask" />
  </div>
</template>

<script>
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import axios from "axios";
export default {
  name: "App",
  components: {
    Header,
    AddTask,
    Tasks,
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
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  async created() {
    const res = await axios.get("http://localhost:5000/tasks");
    this.tasks = res.data;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
