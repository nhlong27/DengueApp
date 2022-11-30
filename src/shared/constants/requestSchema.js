let countryList = {};
let countries = [
  'France',
  'Vietnam',
  'Malaysia',
  'United States',
  'England',
  'Russia',
  'China',
  'Japan',
  'Hongkong',
  'Taiwan',
];
countries.forEach((country) => (countryList[`${country}`] = country));
let cityList = {};
let cities = [
  'HCM City',
  'Hanoi',
  'Hue',
  'Nha Trang',
  'Hai Phong',
  'Vung Tau',
  'Can Tho',
  'Vinh',
  'Ha Long',
  'Buon Ma Thuot',
];
cities.forEach((city) => (cityList[`${city}`] = city));
export { countryList, cityList };
