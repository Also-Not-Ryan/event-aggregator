import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(en)

export function getCountrylist(){
    let countryList = Object.entries(countries.getNames('en'))
    return countryList
}