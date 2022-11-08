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
import Web3 from "web3";
import BigNumber from "bignumber.js";

const SelectToken = (props) => {
  const { walletAddress } = props;

  const [selectedTokenFrom, setSelectedTokenFrom] = useState(null);
  const [selectedTokenTo, setSelectedTokenTo] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [statusTx, setStatusTx] = useState(false);

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
    const amount = Number(amountFrom * 10 ** selectedTokenFrom.decimals);
    const fromToken = selectedTokenFrom.address;
    const toToken = selectedTokenTo.address;
    const fee = 1.5;

    const params = {
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount: amount,
      fee: fee,
    };

    axios
      .get(`https://api.1inch.io/v4.0/56/quote`, { params })
      .then((res) => {
        let result = Number(res.data.toTokenAmount / 10 ** 18);
        console.log(res.data, "handle quote response");
        setAmountTo(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprove = () => {
    const takerAddress = walletAddress;
    const tokenFromAddress = selectedTokenFrom.address;
    const spenderAddress = "0x1111111254fb6c44bac0bed2854e76f90643097d";
    const web3 = new Web3(Web3.givenProvider);

    const erc20ABI = [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_from",
            type: "address",
          },
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
          {
            name: "",
            type: "uint8",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
          {
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        payable: true,
        stateMutability: "payable",
        type: "fallback",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
    ];

    const ERC20TokenContract = new web3.eth.Contract(
      erc20ABI,
      tokenFromAddress
    );

    const maxApproval = new BigNumber(2).pow(256).minus(1);

    const params = {
      tokenAddress: tokenFromAddress,
      walletAddress: takerAddress,
    };

    // Check Allowance
    axios
      .get(`https://api.1inch.io/v4.0/56/approve/allowance`, { params })
      .then((res) => {
        let result = res.data.allowance;
        if (result > 0) {
          console.log(result);
          setStatusTx(true);
        } else {
          ERC20TokenContract.methods
            .approve(spenderAddress, maxApproval)
            .send({ from: takerAddress })
            .then((tx) => setStatusTx(tx.status))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSwap = () => {
    
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
      {!!statusTx ? (
        <button className="swap-button" onClick={handleSwap}>
          Confirm Trade
        </button>
      ) : (
        <button className="swap-button" onClick={handleApprove}>
          Swap
        </button>
      )}
    </div>
  );
};

export default SelectToken;
