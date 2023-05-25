export default defineNuxtPlugin(() => {
  const hoge = (message: string) => `hello ${message}`;

  return {
    provide: {
      hoge
    }
  };
});
