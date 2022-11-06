import "./style.scss";
import { useEffect, useState } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import { ethers } from "ethers";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnection] = useState(false);

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log("Detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
        setWalletConnection(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not connected");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", async () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", async () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="navbar">
      <Nav className="navbar-nav">
        <NavItem className="logo">
          <NavLink active href="#">
            Moirai
          </NavLink>
        </NavItem>
        <NavItem>
          {!!walletConnected ? (
            <h4 className="user-address">{walletAddress}</h4>
          ) : (
            <Button onClick={(e) => requestAccount(e)}>Connect Wallet</Button>
          )}
        </NavItem>
      </Nav>
    </div>
  );
};

export default Navbar;
