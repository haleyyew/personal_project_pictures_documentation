const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/picturesDb';

class PicturesService{
	
	constructor(req, res){
		this.req = req
		this.res = res
	}

	insert(pictureItem, db, callback){
		db.collection('picture').insertOne({	// each item is {name,comment,version}
		  		"name" : pictureItem.name,
				"comment" : pictureItem.comment,
				"version" : pictureItem.version
		}, function(){
			callback()		
		})
	}

	addPicture(){
        console.log('add', this.req.body.pictureItem)
		let self = this;
		let pictureItem = this.req.body.pictureItem;
		try{
			MongoClient.connect(url, function(err, db) {
				//console.log('db connected')
				assert.equal(null, err);
				// TODO keep all previous versions, insert with latest version
                db.collection('picture').find({name : pictureItem.name}).toArray(function(err, result) {
					var pictureLen = result.length
                    pictureItem.version = pictureLen + 1
                    self.insert(pictureItem, db, function(){
                        db.close()
                        return self.res.status(200).json({
                            status: 'success'
                        })
                    })
				})

			});
		}
		catch(error){
			return self.res.status(500).json({
				status: 'error',
				error: error
			})
		}
	}
	getPictures(){
        console.log('get')
		let self = this;
		try{
			MongoClient.connect(url, function(err, db) {
                //console.log('db connected')
				assert.equal(null, err);
			  	let picturesList = []
			  	let cursor = db.collection('picture').find();

			   	cursor.each(function(err, doc) {
			      assert.equal(err, null);
			      if (doc != null) {
			        picturesList.push(doc)
			      } else {

					// TODO sort res, only keep latest version
					var groupBy = function(xs, key) {
					  return xs.reduce(function(rv, x) {
						  (rv[x[key]] = rv[x[key]] || []).push(x);
						  return rv;
					  }, {});
					};

                    var pictureGroups = groupBy(picturesList, 'name')
					var latestPicturesList = []


					for (var property in pictureGroups) {
                        if (!pictureGroups.hasOwnProperty(property)) {continue}
						var group = pictureGroups[property];
						var largest = group.reduce(function(x,y){
							return (x.version > y.version) ? x : y;
						});
                        latestPicturesList.push(largest)
					}

					var compare = function (a,b) {
					  if (a.name < b.name)
						  return -1;
					  if (a.name > b.name)
						  return 1;
					  return 0;
					}
					latestPicturesList.sort(compare)

			        return self.res.status(200).json({
						status: 'success',
						data: latestPicturesList
					})
			      }
			   	});
			});
		}
		catch(error){
			return self.res.status(500).json({
				status: 'error',
				error: error
			})
		}
	}
}
module.exports = PicturesService