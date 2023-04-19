<!-- Question: what's the common way to order template & script & style?? -->
<script>
export default {
  name: 'LoginUser',
  data() {
    console.log('--test: Login: data')
    const age = 12 + 33
    return {
      nameOfPerson: 'Daniel',
      age,
      todos: [],
    }
  },
  async fetch() {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    )
    this.todos = data
  },
  created() {
    console.log('--test: Login: created')
  },
  mounted() {
    console.log('--test: Login: mounted')
  },
  beforeMount() {
    console.log('--test: Login: beforeMount')
  },
}
</script>
<template>
  <div class="">
    <div>
      <h2>Props</h2>
      <p>nameOfPerson: {{ nameOfPerson }}</p>
      <p>age: {{ age }}</p>
    </div>
    <div>
      <p>User Name</p>
      <input type="text" />
      <p>Password</p>
      <input type="password" />
      <div>
        <button class="loginButton">Login</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.textHere {
  color: red;

  &:hover {
    color: blue;
    font-weight: bold;
  }
}
</style>
