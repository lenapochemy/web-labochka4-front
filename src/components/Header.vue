
<script >
export default {
  name: "Header",
  props: {
    title: String,
    name: String,
    group: String,
    variant: String
  }
}
</script>

<template>
  <div class="greetings">
    <h1 id="my_name">{{name}}, {{group}}</h1>
    <h3 id="lab_work">{{title}}, вариант {{variant}}</h3>
  </div>
</template>



<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
