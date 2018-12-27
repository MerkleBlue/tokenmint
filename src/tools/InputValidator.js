import cc from 'cryptocurrencies';
import web3 from 'web3';

export default class InputValidator {

  static startsWithWhiteSpaces(value) {
    return /^\s/.test(value);
  }

  static isTokenNameValid(tokenName) {
    if (tokenName === "") {
      return true;
    }
    return /^[a-zA-Z0-9\-\s]+$/i.test(tokenName)
      && tokenName.length >= 3
      && !this.startsWithWhiteSpaces(tokenName);
  }

  static isTokenSymbolValid(tokenSymbol) {
    if (tokenSymbol === "") {
      return true;
    }
    return /^[a-z0-9]+$/i.test(tokenSymbol) && tokenSymbol.length >= 3;
  }

  static isDecimalsValid(decimals) {
    if (decimals === "") {
      return true;
    }
    let n = Math.floor(Number(decimals));
    return n !== Infinity && String(n) === decimals && n >= 0 && n <= 50;
  }

  static isTotalSupplyValid(totalSupply) {
    if (totalSupply === "") {
      return true;
    }
    let n = Math.floor(Number(totalSupply));
    return n !== Infinity && String(n) === totalSupply && n > 0 && n <= 1000000000000000;
  }

  static isTokenOwnerValid(tokenOwner) {
    if (tokenOwner === "") {
      return true;
    }
    if (!tokenOwner.startsWith("0x")) {
      return false;
    }
    return web3.utils.isAddress(tokenOwner);
  }

  static isIcoCapValid(icoCap) {
    if (icoCap === "") {
      return true;
    }
    let n = Math.floor(Number(icoCap));
    return n !== Infinity && String(n) === icoCap && n > 0 && n <= 1000000000000000;
  }

  static isIcoRateValid(icoRate) {
    if (icoRate === "") {
      return true;
    }
    let n = Math.floor(Number(icoRate));
    return n !== Infinity && String(n) === icoRate && n > 0 && n <= 1000000000000000;
  }

  static isInputValid(tokenName, tokenSymbol, decimals, totalSupply, tokenOwner) {
    return this.isTokenNameValid(tokenName) && tokenName !== "" &&
      this.isTokenSymbolValid(tokenSymbol) && tokenSymbol !== "" &&
      this.isDecimalsValid(decimals) && decimals !== "" &&
      this.isTotalSupplyValid(totalSupply) && totalSupply !== "" &&
      this.isTokenOwnerValid(tokenOwner) && tokenOwner !== "";
  }

  static areTokenAttributesValid(tokenName, tokenSymbol, decimals, totalSupply) {
    return this.isTokenNameValid(tokenName) && tokenName !== "" &&
      this.isTokenSymbolValid(tokenSymbol) && tokenSymbol !== "" &&
      this.isDecimalsValid(decimals) && decimals !== "" &&
      this.isTotalSupplyValid(totalSupply) && totalSupply !== "";
  }

  static isTokenSymbolUnique(tokenSymbol) {
    return (cc.symbols().find(symbol => symbol === tokenSymbol) === undefined);
  }
}


