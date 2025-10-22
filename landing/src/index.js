export default {
  async fetch(request, env, ctx) {
    try {
      // Serve from assets
      let response = await env.ASSETS.fetch(request);
      
      // Optional: Fallback to index.html on 404 (for Pelican routing)
      if (response.status === 404) {
        const url = new URL('/', request.url);
        response = await env.ASSETS.fetch(new Request(url, request));
      }
      
      return response;
    } catch (error) {
      console.error('Worker exception:', error);  // Logs to 
tail/dashboard
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
