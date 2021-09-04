
// converts Number to currency string
export default function numberToDollar(num) {
  return (num).toLocaleString("en-US", {
    style: "currency", 
    currency: "USD", 
    minimumFractionDigits: 0 // change to 2 for cents
  })
}