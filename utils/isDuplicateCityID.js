// listOfCities is an array of strings containing all the added cities
// id is a string of the city to check
export function isDuplicateCityId(listOfCities, id){
  if(listOfCities.indexOf(id) === -1 )
    return false
  return true
}