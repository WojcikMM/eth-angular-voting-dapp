// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Candidate {

    string name;
    uint voteCount;

    constructor(string memory _name) {
        name = _name;
    }

    // Setters

    function vote() public  {
        voteCount++;
    }

    // Getters

    function getName() public view returns (string memory) {
        return name;
    }

    function getVoteCount() public view returns (uint){
        return voteCount;
    }

}
