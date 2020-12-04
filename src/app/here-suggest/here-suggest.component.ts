import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize,map, startWith, catchError } from 'rxjs/operators';
import {Observable,of,empty } from 'rxjs';

@Component({
  selector: 'app-here-suggest',
  templateUrl: './here-suggest.component.html',
  styleUrls: ['./here-suggest.component.scss']
})
export class HereSuggestComponent implements OnInit {

  //search control gruop
  searchAddressCtrl = new FormControl();
  filteredData: any;
  isLoading = false;
  errorMsg: string;

  
  //variable for store user's address
  address : any;

  @Input() public lat: any;
  @Input() public lng: any;
  @Input() public country: any;
  @Input() public lang: any;
  @Input() public appCode: any;

  @Output() optionSelected = new EventEmitter<any>();

  selectedOption : any;
  items : any[];
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //fetch data using httpClient's Observable switchMap(user's typing)
    const AUTOCOMPLETION_URL = 'https://discover.search.hereapi.com/v1/discover';
    this.searchAddressCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredData = [];
          this.isLoading = true;
        }),
        switchMap(value => value != '' ? 
          this.http.get(AUTOCOMPLETION_URL + `?at=${this.lat},${this.lng}` +"&q=" + value + "&in=countryCode:" + this.country + "&lang=" + this.lang + "&limit=5&apiKey=" + this.appCode) 
          .pipe(finalize(() => {
              this.isLoading = false
            }),
          ) : empty()
        ),
        catchError(err => of(null))
      )
      .subscribe(data=> {
        if (data == null) {
          this.errorMsg = 'error';
          this.filteredData = [];
          this.isLoading = false;
        } else{
          this.errorMsg = "";
          this.items = data['items'];
          this.filteredData = this.response_filter(this.items);
          console.log(this.filteredData);
        }
      },
      err => console.log(err)
    );
  }

  private response_filter(items:any[]) : any[]{
    return items.filter(item => item.resultType=='street' || item.resultType == 'houseNumber');
  }

  //occored when auto-complete option selected
  public selected(event : any){
    this.address = event.option.value.address;
  }

  //display user's label(country)
  public displayFn(item : any) : string{
    return item? item.title : item;
  }

  public onOptionChanged(option : any){
    this.selectedOption = this.findOptionByName(option);
    this.optionSelected.emit(this.selectedOption);
  }

  private findOptionByName(name : string) : any{
    return this.items.find(option => option.title==name);
  }

}
