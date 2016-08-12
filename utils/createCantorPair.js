export default function createCantorPair(num1, num2){
  return (((num1+num2)*(num1+num2+1)*0.5)+num2).toFixed(3)
}