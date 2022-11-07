import axios from "axios";
import React, { useEffect, useState } from "react";
import dataTokens from "../../const/data_tokens.json";
import SelectToken from "../SelectToken";
import "./style.scss";

const SwapBox = () => {
  // const [tokens, setTokens] = useState([]);
  // const [tokenAddress, setTokenAddress] = useState([]);
  const tokens = dataTokens.tokens;

  // Use when we want to call the API
  // useEffect(() => {
  //   axios
  //     .get(`https://api.1inch.io/v4.0/56/tokens`)
  //     .then((res) => {
  //       let data = res.data.tokens;
  //       setTokenAddress(Object.keys(data))
  //       setTokens(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="swap-box">
      <h1>Trade Your Tokens</h1>
      <p>Pay With</p>
      <SelectToken></SelectToken>
    </div>
  );
};

export default SwapBox;
