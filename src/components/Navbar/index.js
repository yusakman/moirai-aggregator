import "./style.scss";
import { useEffect, useState } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";

const Navbar = (props) => {
  const {
    walletAddress,
    walletConnected,
    requestAccount,
  } = props;

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
