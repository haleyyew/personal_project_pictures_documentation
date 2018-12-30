const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/picturesDb';

var fs = require("fs"),
    path = require("path");
var joinPath = require('path.join');

var listOfFiles = []
function walk(dir, callback) {
    fs.readdir(dir, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            var filepath = joinPath(dir, file);
            fs.stat(filepath, function(err,stats) {
                if (stats.isDirectory()) {
                    walk(filepath, callback);
                } else if (stats.isFile()) {
                    callback(filepath, stats);
                }
            });
        });
    });
}

// function addFile(pictureItemName, stats) {
//     console.log('ADDED', pictureItemName)
//     listOfFiles.push(pictureItemName)
// }

var handler = function insert(pictureItemName){
    pictureItemName = pictureItemName.replace('/Users/haoran/Documents/pictures_documentation/PictureDocApp/src/', '')

    MongoClient.connect(url, function(err, db) {
        db.collection('picture').find({name:pictureItemName}).toArray(function(err, result) {
            if (result.length == 0) {
                db.collection('picture').insertOne({	// each item is {name,comment,version}
                    "name" : pictureItemName,
                    "comment" : '',
                    "version" : 1
                });
                console.log('ADDED', pictureItemName)
                db.close()
                return
            } else {
                console.log('NOT added', pictureItemName)
                db.close()
                return
            }
        });

    });

}

var filepath = '/Users/haoran/Documents/pictures_documentation/PictureDocApp/src/assets/'

walk(filepath, handler)
