export function onRequest(context) {
  async fetch(context.request) {
    async function auth() {
      const auth_response = await fetch("https://www.fife.gov.uk/api/citizen?preview=false&locale=en");
      const auth_headers = await auth_response.headers;
      const auth = auth_headers.get("authorization");
      return auth;
    };


    const { searchParams } = new URL(context.request.url);
    let postcode = searchParams.get('postcode');
    const authcode=await auth();
    const fetch_body = '{"name": "bin_calendar", "data":{"postcode": "' + postcode + '"}}"';
    const addresses = await fetch("https://www.fife.gov.uk/api/widget?action=propertysearch&actionedby=ps_3SHSN93&loadform=true&access=citizen&locale=en", {method: "POST",headers: {"Content-Type": "application/json","Accept": "application/json, text/javascript, */*; q=0.01","Authorization": authcode},body: fetch_body,});
    const json_addresses = await addresses.json();
      return Response.json(json_addresses.data);
  },
};

