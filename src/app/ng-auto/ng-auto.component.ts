import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ng-auto',
  templateUrl: './ng-auto.component.html',
  styleUrls: ['./ng-auto.component.scss']
})
export class NgAutoComponent implements OnInit {

  keyword = 'title';

  data: any;
  errorMsg: string;
  isLoadingResult: boolean;

  lat = '37.7397';
  lng = '-121.4252';
  country = 'USA';
  lang = 'en-US';
  appCode = 'JJq7Vn7I07ELX9u2x1FUqgt5mZUOe-0v2iaEGnCwQUg';


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  getServerResponse(event) {

    this.isLoadingResult = true;

    const AUTOCOMPLETION_URL = 'https://discover.search.hereapi.com/v1/discover';

    this.http.get(AUTOCOMPLETION_URL + `?at=${this.lat},${this.lng}` +"&q=" + event + "&in=countryCode:" + this.country + "&lang=" + this.lang + "&limit=5&apiKey=" + this.appCode)
      .subscribe(data => {
        if (data['items'] == undefined) {
          this.data = [];
          this.errorMsg = data['Error'];
        } else {
          this.data = data['items'];
          console.log(this.data);
        }

        this.isLoadingResult = false;
      });
  }

  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

}
