var https = require("https");
class Quandl {
 data = {};
 Call(url, path) {
    ((url, path) => {
        https.request('https://' + url + path, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            let body = ''
            let dataPath = '/data';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                console.log('https://' + url + path)
                console.log(body)
                this.data = JSON.parse(body);

                this.setState({ data: this.data.dataset_data });
            });
            if ('location' in res.headers) {
                console.log("relocating to ", res.headers.location)
                this.Call(res.headers.location)
            }
        }).end();
    }).bind(this)
}
}
export default Quandl;