import React, { useState } from "react";


function CurrencyRaw(props){

    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    

    return(
    <div className="card card-body">
        <div className="raw">
            <div className="col-lg-10">
                <form className="form-inline mb-4">

                    <input  type="number" className="form-control form-control-lg mx-3"  value={amount} onChange={onChangeAmount}> 
                    </input>


                    <select className="form-control form-control-lg" value={selectedCurrency} onChange={onChangeCurrency}>
                            {currencyOptions.map((option,index) => (
                                <option key={index} value={option}>{option}</option> 
                            ))}   
                    </select>
                </form>
            </div>
        </div>
    </div>
    );

    
}
export default CurrencyRaw;




