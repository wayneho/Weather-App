export default function capitalizeWords(string){
  return string.split(' ').map(s=>{
    return s.charAt(0).toUpperCase()+s.substring(1)
  }).join(' ')
}