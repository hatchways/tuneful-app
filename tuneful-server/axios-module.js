const axios = require("axios");
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

const base = "https://api.spotify.com/v1/search";
const accessToken = 'Bearer BQD9YfWFZ7xs2_v7A2hYLT3EoK8sX8OHWmpDLZwlbanDTejxCCIY98nzP3yFwXRzhf_cYHu4-ngXS1Sr34yv0Jlc85HY24iO9ihbZO4RavNCzJwq-PkvzeVWHYpu1YcgWeSpXrCBwXUlb2mUirEtSjxXoq5PCw60Fg';
const query = "Abba"
const url = base+"?"+"q="+query+"&type=track,album,artist"




axios.get(url, { headers: { Authorization: accessToken } }).then(response => {
    // If request is good...
    console.log(response.data.tracks.items);
  })
  .catch((error) => {
    console.log('error' + error);
  });


