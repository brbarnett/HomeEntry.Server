var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/homeentry';

var app = express();
app.use(bodyParser.json());

app.post('/api/entry/authenticate', function(req, res) {
    var uid = req.body.uid;

    MongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;

        findDeviceByUid(uid, db, function(result) {
            db.close();
            
            if(!result) {
                res.send({ success: true, found: false, active: false });
                return;
            }   // bail out if not found
            
            console.log('Device found: ' + result.uid);
            
            res.send({ success: true, found: true, active: result.active });
        });
    });
});

app.put('/api/entry/devices', function(req, res) {
    var device = req.body;

    MongoClient.connect(dbUrl, function(err, db) {
        upsertDevice({
            uid: device.uid,
            active: device.active,
            updated: Date.now()
        }, db, function(result) {
            db.close();
        });
    });

    res.send({ "success": true });
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});

function findDeviceByUid(uid, db, callback) {
    db.collection('tenants').findOne({ "uid": uid }, function(err, result) {
        if(err) throw err;
        
        callback(result);
    });
}

function upsertDevice(device, db, callback) {
    db.collection('tenants').updateOne(
        { "uid": device.uid },
        device,
        {
            upsert: true
        }, function(err, result) {
            callback(result);
        }
    )
}