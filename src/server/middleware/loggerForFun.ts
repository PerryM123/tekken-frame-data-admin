export default defineEventHandler(async (event) => {
  console.log('Request: ', event.node.req.url);
});
