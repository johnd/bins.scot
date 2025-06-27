export function onRequest(context) {
  async fetch(context.request) {
    async function auth() {
      const auth_response = await fetch("https://www.fife.gov.uk/api/citizen?preview=false&locale=en");
      const auth_headers = await auth_response.headers;
      const auth = auth_headers.get("authorization");
      return auth;
    };

    const { searchParams } = new URL(context.request.url);
    let houseid = searchParams.get('houseid');
    const authcode=await auth();
    const bin_req = await fetch("https://www.fife.gov.uk/api/getobjectdata?objecttype=property&objectid=" + houseid, {method: "POST",headers: {"Content-Type": "application/json","Accept": "application/json, text/javascript, */*; q=0.01","Authorization": authcode}});
    const bin_data = await bin_req.json();  
    return new Response.json(bin_data.profileData);

  },
};

