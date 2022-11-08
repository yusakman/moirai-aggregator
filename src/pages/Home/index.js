import Navbar from "../../components/Navbar";
import SwapBox from "../../components/SwapBox";
import { useEffect, useState } from "react";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnection] = useState(false);

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log("Detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWalletConnection(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not connected");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
        setWalletConnection(false);
      });
    }
  }, []);

  const props = {
    walletAddress,
    setWalletAddress,
    walletConnected,
    setWalletConnection,
    requestAccount,
  };

  return (
    <div className="home">
      <Navbar {...props}></Navbar>
      <SwapBox {...props}></SwapBox>
    </div>
  );
};

export default Home;
