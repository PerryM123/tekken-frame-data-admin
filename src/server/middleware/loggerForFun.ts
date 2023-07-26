export default defineEventHandler(async (event) => {
  console.log('==============');
  console.log('Server Middleware: Request: ', event.node.req.url);
  console.log('Server Middleware: sessions: ', event.context.sessions);
});
