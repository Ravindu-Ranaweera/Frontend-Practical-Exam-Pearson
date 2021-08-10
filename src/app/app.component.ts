import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public countries: Country[] = [];
  constructor(private countryService: CountryService){}


  ngOnInit(){
    this.getCountry();
  }

  public getCountry(): void
{
  this.countryService.getCountry().subscribe(
    (response: Country[])=>{
      this.countries = response;
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
}
