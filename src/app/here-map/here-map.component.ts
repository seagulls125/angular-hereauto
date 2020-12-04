import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable,of,empty } from 'rxjs';
import { debounceTime, tap, switchMap, finalize,map, startWith, catchError } from 'rxjs/operators';

import {countryCode} from '../countryCode';
import {languageCode} from '../languageCode';

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {


  //credintal information for access heremap api
  appId = 'JYGHxbg8O1jjh6Bz6rHw';
  appCode = 'JJq7Vn7I07ELX9u2x1FUqgt5mZUOe-0v2iaEGnCwQUg';

  lat = '37.7397';
  lng = '-121.4252';


  //country autocomplete field
  countryCtrl = new FormControl();
  options: any[] = countryCode;

  //country list on user input
  filteredOptions: Observable<any[]>;

  //initial country
  country = 'USA';

  //language input field
  langCtrl = new FormControl();
  optionsLang : any[] = languageCode;

  //initial language
  lang = 'en-US';

  //selected Address result
  result : any;

  public constructor() { }

  public ngOnInit() {
    this.filteredOptions = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  //display country name
  public displayCountry(item : any):string{
    return item? item.name : item;
  }

  //set current country code
  public selectedCountry(event : any){
    this.country = event.option.value.code;
  }

  //display full language name
  public displayLang(item : any):string{
    return item ? item.td[3] : item;
  }

  //set current language code
  public selectedLang(event : any){
    this.lang = event.option.value.td[0];
  }

  private _filter(value: any): any[] {
    let filterValue : any;
    if(typeof value === 'string'){
      filterValue = value.toLowerCase();
    }
    else{
      filterValue = value.name.toLowerCase();
    }
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public selectedAddress(event : any){
    this.result = event;
  }

}