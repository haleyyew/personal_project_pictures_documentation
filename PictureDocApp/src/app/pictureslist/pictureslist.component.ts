import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service'
import { Picture } from '../addpicture/picture.model'

@Component({
  selector: 'pictures-list',
  templateUrl: './pictureslist.component.html',
  styleUrls: ['./pictureslist.component.css']
})
export class PicturesListComponent implements OnInit {

  private picturesList:Picture[]

  constructor(private commonService:CommonService){

  }

  ngOnInit(){
    this.getAllPictures()

    this.commonService.add_subject.subscribe(response => {
      // console.log('init response', this.commonService.picturesList)
      // this.commonService.picturesList.map(e => {
      //     console.log('init response', e)
      //   })
      // this.picturesList = this.commonService.picturesList
      this.getAllPictures()
    })
  }



  getAllPictures(){
    console.log('get all pictures')
    this.commonService.getPictures().subscribe((res : any) =>{
      this.picturesList  = []

      res.data.map(e => {
        this.picturesList.push(new Picture(e.name, e.comment));
        console.log('get', e.name, e.comment)
      })
    })
  }

}
