export const state = () => ({
  list: []
});

export const mutations = {
  add(state: any, text: any) {
    state.list.push({
      text,
      done: false
    });
  },
  remove(state: any, { todo }: any) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state: any, todo: any) {
    todo.done = !todo.done;
  }
};
