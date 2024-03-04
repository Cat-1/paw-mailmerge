var express = require('express');
var path = require('path');
var app = express();
app.set('port', 51231);

app.use(express.static(path.join(__dirname, 'react-paw-mailmerge','build')));

// standard listening
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
