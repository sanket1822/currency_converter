
import React, { useEffect, useState } from "react";
import CurrencyRaw from "./CurrencyRaw";


const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";


function App(){

    let toAmount, fromAmount;

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency]= useState([]);
    const [toCurrency, setToCurrency] = useState([]);
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true) 

    
   //amountInFromCurrency variable created to keep track of which value changing fromCurrency 
   //or toCurrency
   

   // formula to convert currency values
    if(amountInFromCurrency){
        fromAmount =  Number.parseFloat(amount).toFixed(2);
        toAmount = Number.parseFloat(amount * exchangeRate).toFixed(2);
    }else{
        toAmount = Number.parseFloat(amount).toFixed(2);
        fromAmount = Number.parseFloat(amount/exchangeRate).toFixed(2);
    }


    var myHeaders = new Headers();
    myHeaders.append("apikey", "bChuD7xhEmLdE2sa1TTSBh0bkEaFEzAM");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };


    // useEffect created for first render
    

    useEffect(() => {
        fetch(BASE_URL, requestOptions)
        .then(res => res.json())
        .then(data =>{
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
        }) 
    }, [])



    // on changing values of fromCurrency and toCurrency here created it's effect

    useEffect(() => {
        if(fromCurrency != null && toCurrency != null){
            fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]) )
        }
        

    },[fromCurrency, toCurrency])

    function handleFromChnage(e){
        setAmount(e.target.value);
        setAmountInFromCurrency(true);

    }
    function handleToChnage(e){
        setAmount(e.target.value);
        setAmountInFromCurrency(false);    
    }





    return(<div>
            <h1>Welcome to  Currency Converter</h1>
            <CurrencyRaw
                currencyOptions = {currencyOptions}
                selectedCurrency = {fromCurrency}
                onChangeCurrency = {e => setFromCurrency(e.target.value)}
                amount = {fromAmount}
                onChangeAmount={handleFromChnage}
            />
            <div className="equals">=</div>
            <CurrencyRaw
                 currencyOptions = {currencyOptions}
                 selectedCurrency = {toCurrency}
                 onChangeCurrency = { e => setToCurrency(e.target.value)}
                 amount ={toAmount}
                 onChangeAmount={handleToChnage}
            />
    </div>
       
    );
}

export default App;