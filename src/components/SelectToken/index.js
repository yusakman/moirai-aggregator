import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import dataTokens from "../../const/data_tokens.json";

const SelectToken = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [value, setValue] = useState("");

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

  const onTokenChange = (e) => {
    setSelectedToken(e.value);
    console.log("Value", e.value);
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

  return (
    <div className="container">
      <div className="token-from-select">
        <Dropdown
          value={selectedToken}
          options={tokens}
          onChange={onTokenChange}
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Amount"
        ></InputText>
      </div>
    </div>
  );
};

export default SelectToken;
