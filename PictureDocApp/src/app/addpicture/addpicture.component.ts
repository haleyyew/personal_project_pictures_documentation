import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service'

@Component({
  selector: 'add-picture',
  templateUrl: './addpicture.component.html',
  styleUrls: ['./addpicture.component.css']

})
export class AddPictureComponent implements OnInit {


  constructor(private commonService:CommonService) {

  }

  addPicture(name, comment){

    this.commonService.addPicture(name.value, comment.value).subscribe(res => {
      console.log('add res')
      this.commonService.add_subject.next()
    })

  }

  ngOnInit() {

  }
}
