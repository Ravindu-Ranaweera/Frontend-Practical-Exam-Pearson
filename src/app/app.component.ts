import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from './country';
import { CountryService } from './country.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'AngularMaterial';
  public countries: Country[] = [];
  httpDataService: any;
  
  isEditMode = false;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor( private countryService: CountryService){}
  
  ngOnInit(){
    this.getCountry();
  }


 // view country controller
  public getCountry(): void{
    this.countryService.getCountry().subscribe(
        (response: Country[])=>{
          this.countries = response;
          this.dataSource.data = response;
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
  }

// add country controller
  public onAddCountry(addCountry: NgForm): void {
    this.countryService.addCountry(addCountry.value).subscribe(
      (response: Country)=>{
        this.getCountry();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

// update controller
  public onUpdateCountry(updateCountry: NgForm): void {
    console.log(updateCountry.value.id);
    this.countryService.updateCountry(updateCountry.value,  updateCountry.value.id).subscribe(
      (response: Country)=>{
        this.getCountry();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  editCountry(id: number) {

    const form = document.getElementById(`${id}`);
    const table = Array.from( document.getElementsByClassName('updateForm') as HTMLCollectionOf<HTMLElement> );

    table
    .forEach(function (value) {
      value.style.display= 'none';
    });    

    console.log(table);
    if (form !== null) {
      form.style.display='block';
    }
  }

// delete country controller
  public onDeleteCountry(id: number): void {
    if (confirm("Are you sure to delete this country")) {
      this.countryService.deleteCountry(id).subscribe(
        (response: void)=>{
          this.getCountry();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
  } 
    
  }

// search country controller
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
