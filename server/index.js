/**
 * Copyright 2017 Ryoya Kawai
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

let webPort=11011;

let utils = require('./js/utils.js');
utils.init();

let serverConf = {};
serverConf.ip = ((utils.getSelfIPv4Addr()).pop())['address'],
serverConf.port = webPort,
serverConf.url = 'http://' + serverConf.ip + ':' + serverConf.port + '/';

// establish Web Server(API)
let express = require('express');
let app = express();
let server = app.listen(serverConf.port, () => {
    console.log('[Server Started] ' + serverConf.url);
});



const yelp = require('yelp-fusion');
let clientId = 'BEjYW0NplFwcKJfpKNZr7g';
let clientSecret = 'c7VgEbIExv3Wol34lMDXwqBSjVOLLuhzPhepta0P6QfsVz5SRVSjxuGyMS3boSS1'; 
let curl = require('curlrequest');

app.get("/api/getyelpdata", (req, res, next) => {
// https://github.com/Yelp/yelp-fusion/blob/master/fusion/node/sample.js
    const searchRequest = {
        term:'Four Barrel Coffee',
        location: 'san francisco, ca'
    };

    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
            const firstResult = response.jsonBody.businesses[0];
            const prettyJson = JSON.stringify(firstResult, null, 4);
//            console.log(prettyJson);
            res.json({status: true, result: firstResult});
        });
    }).catch( e => {
        console.log(e);
    });
});

app.get("/api/genomelink", (req, res, next) => {
    let path = req.query.path;
    let param = req.query.param.replace('::::', '=');
    let baseUrl='https://genomicexplorer.io/v1';
    if(path=='' || typeof path=='undefined') {
        path='/reports/eye-color?population=european';
    }
    let options = {
        url: baseUrl+path + '?' + param,
        include: true,
        headers: { Authorization: 'Bearer GENOMELINKTEST'}
    };

    curl.request(options, function (err, parts) {
        parts = parts.split('\r\n');
        let body = parts.pop()
        , head = parts.pop();
        res.json({status: true, body:body});
    });
});



// establish Web Server(Doc)
app.use('/', express.static('server/docroot/index.html'));
app.use(express.static('server/docroot'));
