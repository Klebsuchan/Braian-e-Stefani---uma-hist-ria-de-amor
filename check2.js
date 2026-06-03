import https from 'node:https';

const ids = [
  "2055225", "2253879", "3206153", "1036623", "3704250",
  "2958253", "3506454", "1362090", "1820559", "2420444",
  "1415131", "3171151", "1036622", "3801046", "774866"
];

async function check() {
  const working = [];
  for (const id of ids) {
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
    await new Promise(r => {
      https.request(url, { method: 'HEAD' }, (res) => {
        if(res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301) {
           working.push(id);
           console.log(id, "OK");
        } else {
           console.log(id, res.statusCode);
        }
        r();
      }).on('error', () => {
        r();
      }).end();
    });
  }
  console.log("WORKING:", working.join(", "));
}
check();
