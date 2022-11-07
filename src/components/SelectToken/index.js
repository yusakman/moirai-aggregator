import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import dataTokens from "../../const/data_tokens.json";
import axios from "axios";

const SelectToken = () => {
  const [selectedTokenFrom, setSelectedTokenFrom] = useState(null);
  const [selectedTokenTo, setSelectedTokenTo] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const data = dataTokens.tokens;
  const tokenAddress = Object.keys(data);

  const getTokenList = () => {
    const tokenArr = [];
    {
      tokenAddress.map((item) => {
        tokenArr.push(data[`${item}`]);
      });
    }
    setTokens(tokenArr);
  };

  useEffect(() => {
    getTokenList();
  }, []);

  const onTokenFromChange = (e) => {
    setSelectedTokenFrom(e.value);
  };

  const onTokenToChange = (e) => {
    setSelectedTokenTo(e.value);
  };

  const selectedTokenTemplate = (option, props) => {
    if (option) {
      return (
        <div className="token-item token-item-value">
          <img
            alt={option.name}
            src={option.logoURI}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            className={`token token-${option.symbol}`}
          />
          <div className="token-item-selected">{option.symbol}</div>
        </div>
      );
    }

    return <div>{props.placeholder}</div>;
  };

  const tokenOptionTemplate = (option) => {
    return (
      <div className="token-item">
        <img
          alt={option.name}
          src={option.logoURI}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={`token token-${option.symbol}`}
        />
        <span className="token-item-option">{option.symbol}</span>
      </div>
    );
  };

  const handleQuote = () => {
    let amount = Number(amountFrom * 10 ** selectedTokenFrom.decimals);
    let fromToken = selectedTokenFrom.address;
    let toToken = selectedTokenTo.address;

    axios
      .get(
        `https://api.1inch.io/v4.0/56/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}`
      )
      .then((res) => {
        console.log(res);
        let result = Number(res.data.toTokenAmount / 10 ** 18)
        setAmountTo(result)
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <p>Pay With</p>
      <div className="token-from">
        <div className="token-from-select">
          <Dropdown
            value={selectedTokenFrom}
            options={tokens}
            onChange={onTokenFromChange}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a Token"
            valueTemplate={selectedTokenTemplate}
            itemTemplate={tokenOptionTemplate}
          />
        </div>
        <div className="token-from-input">
          <InputText
            value={amountFrom}
            onChange={(e) => setAmountFrom(e.target.value)}
            onBlur={handleQuote}
            placeholder="Amount"
          ></InputText>
        </div>
      </div>
      <p>You'll Receive</p>
      <div className="token-to">
        <div className="token-to-select">
          <Dropdown
            value={selectedTokenTo}
            options={tokens}
            onChange={onTokenToChange}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a Token"
            valueTemplate={selectedTokenTemplate}
            itemTemplate={tokenOptionTemplate}
          />
        </div>
        <div className="token-to-input">
          <InputText
            value={amountTo}
            onChange={(e) => setAmountTo(e.target.value)}
            placeholder="Amount"
          ></InputText>
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
