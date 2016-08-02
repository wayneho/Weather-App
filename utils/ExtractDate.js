const MONTH = [
  "Jan", "Feb", "Mar", 
  "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", 
  "Oct", "Nov", "Dec"
]

const DAY = [
  "Sun","Mon", "Tue", 
  "Wed","Thu", "Fri", 
  "Sat"
]

export function extractDate(dt){
  const date = new Date(dt*1000)
  const day = DAY[date.getDay()]
  const month = MONTH[date.getMonth()]
  return `${day}, ${date.getDate()} ${month}`
}