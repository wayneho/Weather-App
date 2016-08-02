export function convertUnit(temperature, unit){
  return Math.round(unit==='celsius'?temperature-273.15:temperature*(9/5)-459.67)
}