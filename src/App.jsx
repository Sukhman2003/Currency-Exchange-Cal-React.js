import { useState,useEffect } from 'react'
import './App.css'
import {InputBox} from './assets/Components/InputBox'
import useCurrencyInfo from './assets/hooks/useCurrencyInfo'

function App() {
  const [amount, setamount] = useState(0)
  const [from,setfrom]=useState("usd")
  const [to,setto]=useState("inr")
  const [convertedAmount,setconvertedAmount]=useState(0)

  const currencyInfo=useCurrencyInfo(from)

  const options=Object.keys(currencyInfo.rates || {})

  const swap=()=>{
    setfrom(to);
    setto(from);
    setamount(convertedAmount);
    setconvertedAmount(amount);
  }


  const convert = () => {
    if (currencyInfo.rates && currencyInfo.rates[to]) {
        setconvertedAmount(amount * currencyInfo.rates[to]);
    }
};

useEffect(() => {
    if (currencyInfo.rates && currencyInfo.rates[to]) {
        setconvertedAmount(amount * currencyInfo.rates[to]);
    }
}, [amount, from, to, currencyInfo]);


  return (
    <div
        className="w-screen h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat text-black"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/30413636/pexels-photo-30413636/free-photo-of-collection-of-various-british-coins-close-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                       convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>{setfrom(currency)}}
                            selectCurrency={from}
                            onAmountChange={(amount)=>setamount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="to"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=> {setto(currency)}}
                            selectCurrency={to}
                            amountDisabled
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
