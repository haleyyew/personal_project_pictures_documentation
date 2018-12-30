import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../addpicture/picture.model'
import { Subject } from 'rxjs/Rx';

@Injectable()
export class CommonService {
	public picturesList: Picture[]
	public add_subject=new Subject<String>()

	constructor(private http : HttpClient){
		this.picturesList = []
	}

	addPicture(name, comment){
		// this.picturesList.push(new Picture(item.value))
		// this.add_subject.next()
    console.log('add', name, comment)
    return this.http.post('/api/addPicture',{
      pictureItem : {'name': name, 'comment' : comment}
    })
	}

  getPictures(){
	  console.log('get pictures')
    return this.http.post('/api/getPictures',{})
  }
}
