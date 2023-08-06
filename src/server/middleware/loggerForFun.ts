export default defineEventHandler(async (event) => {
  console.log('Server Middleware: Request: ', event.node.req.url);
});
