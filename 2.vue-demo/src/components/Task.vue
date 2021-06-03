<template>
  <!-- <div class="task" :class="task.reminder ? 'reminder' : ''"> -->
  <div :class="['task', task.reminder ? 'reminder' : '']">
    <h3>
      {{ task.text }}
      <i class="fas fa-times"></i>
    </h3>
    <p>{{ task.date.toString() }}</p>
  </div>
</template>
<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
};
</script>
<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>