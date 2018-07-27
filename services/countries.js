import * as config from '../config.json';

export class CountriesService {

  getCountryList() {
    return config.countryList;
  }

  getCountryOrDefault(countryCode) {
    let _selectedCountry = this.getCountryList().find(country => country.code === countryCode);
    if (!_selectedCountry && this.getCountryList().length > 0) {
      _selectedCountry = this.getCountryList()[0];
    }
    return _selectedCountry;
  }

}