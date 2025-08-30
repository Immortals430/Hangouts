import Products from "../../Components/Products/Products"
import "./StorePage.scss"


export default function StorePage() {
  return (
    <main className='store-page'>
        <h2 className="store-heading">Nearby Offers</h2>
        <Products />
    </main>
  )
}
