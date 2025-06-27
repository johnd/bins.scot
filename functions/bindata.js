export function onRequest(context) {
  async fetch(context.request) {
    async function auth() {
      const auth_response = await fetch("https://www.fife.gov.uk/api/citizen?preview=false&locale=en");
      const auth_headers = await auth_response.headers;
      const auth = auth_headers.get("authorization");
      return auth;
    };

    const { searchParams } = new URL(context.request.url);
    let uprn = searchParams.get('uprn');
    console.log(uprn);
    const authcode=await auth();
    console.log(authcode);

    const fetch_body = '{"name": "bin_calendar", "data":{"uprn": "' + uprn + '"}}"';
    const bin_req = await fetch("https://www.fife.gov.uk/api/custom?action=powersuite_bin_calendar_collections&actionedby=bin_calendar&loadform=true&access=citizen&locale=en", {method: "POST",headers: {"Content-Type": "application/json","Accept": "application/json, text/javascript, */*; q=0.01","Authorization": authcode},body: fetch_body,});

    const bin_data = await bin_req.json();  
    console.log(bin_data);
    return Response.json(bin_data.data);
  },
};

