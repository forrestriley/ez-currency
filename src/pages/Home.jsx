import LiteCurrencySwapper from "../Componets/CalcLite"
import LiteExchangeRatesTable from "../Componets/RateTableLite"
export function Home() {
  return (
    <>
      <div className="row text-center">
        <h1 className="col-12">
          Welcome To EZ-Currency
        </h1>
        <h3 class="col-12">
          Your One Stop Shop For Currencey Conversion
        </h3>
        
      </div>
      <div className="row text-center pt-2">
        <div className="col-12 col-lg-6">
          <LiteCurrencySwapper/>
        </div>
        <div className="col-12 col-lg-6">
          <LiteExchangeRatesTable/>
        </div>
      </div>
    </>
  )
}