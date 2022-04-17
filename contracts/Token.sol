//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "hardhat/console.sol";

contract Token {
  string public name = "Hamsy Token";
  string public symbol = "HMS";
  uint public totalSupply = 1000000;
  mapping(address => uint) public balances;

  constructor(){
    // find the balance of current address
    balances[msg.sender] = totalSupply;
  }

  // other contract can reach to external functions
  function transfer (address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  receive() payable external {

    totalSupply += msg.value; // how much money is sent to contract

  }

  function balanceOf(address account) external view returns (uint) {
    return balances[account];
  }
}