import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doc } from 'src/app/models/doc';
import { Property } from 'src/app/models/property';
import { DocumentService } from 'src/app/services/document/document.service';
import { PropertyService } from 'src/app/services/property/property.service';
import * as $ from "jquery";


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  property:Property = {_id: -1, userid: -1, address: "", monthly_rent: -1, monthly_cost: -1, num_bed: -1, num_bath: -1,
                        image: "", owned_since: "", purchase_price: -1, rentPayments: [], lat: 0, long: 0}
  documents: Doc[] = []

  constructor(private documentService: DocumentService,private propertyService: PropertyService, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.closeForm()
    this.getProperty(<string>this.activatedroute.snapshot.paramMap.get("pid"));
  }

  getProperty(id: string): void {
    this.propertyService.getProperty(id).subscribe((prop) => {
      this.property = <Property>prop;
      this.getDocuments(this.property);
    })
  }

  getDocuments(prop: Property): void{
    let filter: any = $('#filter').val()
    this.documentService.getDocs(prop._id, filter).subscribe((docs) => {
      this.documents = <Doc[]>JSON.parse(JSON.stringify(docs))
    })
  }

  createDocument(prop: Property, type:string, notes: string): void{
    // let type: any = $('#type').val()
    this.documentService.createDocument(prop._id, type, notes).subscribe((doc) => {
      this.documents.push(<Doc>JSON.parse(JSON.stringify(doc)))
      this.successAlert([`Created ${type}`])
    })
  }

  openForm(): void {
    $('#create-doc-form').show('slow');
    $('#add-doc').hide()
  }

  closeForm(): void {
    $('#create-doc-form').hide('slow')
    $('#add-doc').show()
  }

  failedAlert(messages:String[]) {
    messages.forEach(m => {
      $('#failed-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#failed-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#failed-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

  successAlert(messages:String[]){
    messages.forEach(m => {
      $('#success-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#success-alert').fadeTo(1000, 500).slideUp(500, function() {
      $('#success-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

}
