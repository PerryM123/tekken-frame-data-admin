export default defineEventHandler(async (event) => {
  console.log(
    `Server Middleware: ${event.node.req.method} Request: `,
    event.node.req.url
  );
});
