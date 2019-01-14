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

  static isEthereumAddress(address) {
    if (address === "") {
      return true;
    }
    if (!address.startsWith("0x")) {
      return false;
    }
    return web3.utils.isAddress(address);
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

  static isIcoGoalValid(icoGoal) {
    if (icoGoal === "") {
      return true;
    }
    let n = Math.floor(Number(icoGoal));
    return n !== Infinity && String(n) === icoGoal && n > 0 && n <= 1000000000000000;
  }

  static isDateFormatValid(date) {
    const timestamp = Date.parse(date);
    if (isNaN(timestamp)) {
      return false;
    }
    return true;
  }

  static isDateInPast(strDate) {
    const date = new Date(strDate);
    let now = new Date();
    return (date < now);
  }

  static isDateValid(date) {
    if (date === "") {
      return true;
    }
    if (date !== "") {
      if (!this.isDateFormatValid(date)) {
        return false;
      }
      if (this.isDateInPast(date)) {
        return false;
      }
    }
    return true;
  }

  // function only evaluates dates if they are both valid. Otherwise it returns true
  static isOpeningTimeBeforeClosingTime(strOpeningDate, strClosingDate) {
    if (this.isDateValid(strOpeningDate) && this.isDateValid(strClosingDate)) {
      const openingDate = new Date(strOpeningDate);
      const closingDate = new Date(strClosingDate);
      return (openingDate < closingDate);
    }
    return true;
  }

  static isInputValid(tokenName, tokenSymbol, decimals, totalSupply, tokenOwner) {
    return this.isTokenNameValid(tokenName) && tokenName !== "" &&
      this.isTokenSymbolValid(tokenSymbol) && tokenSymbol !== "" &&
      this.isDecimalsValid(decimals) && decimals !== "" &&
      this.isTotalSupplyValid(totalSupply) && totalSupply !== "" &&
      this.isEthereumAddress(tokenOwner) && tokenOwner !== "";
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

  static isGoalHigherThanCap(goal, cap) {
    if (goal === "" || cap === "") {
      return true;
    }
    if (goal !== "" && cap !== "") {
      const nGoal = Math.floor(Number(goal));
      const nCap = Math.floor(Number(cap));
      return nGoal >= nCap;
    }
    return true;
  }

  static areICOAttributesValid(
    tokenName,
    tokenSymbol,
    decimals,
    rate,
    cap,
    goal,
    wallet,
    openingTime,
    closingTime
  ) {
    return this.isTokenNameValid(tokenName) && tokenName !== "" &&
    this.isTokenSymbolValid(tokenSymbol) && tokenSymbol !== "" &&
    this.isDecimalsValid(decimals) && decimals !== "" &&
    this.isIcoRateValid(rate) && rate !== "" &&
    this.isIcoCapValid(cap) && cap !== "" &&
    this.isIcoGoalValid(goal) && goal !== "" &&
    this.isEthereumAddress(wallet) && wallet !== "" &&
    this.isDateValid(openingTime) && openingTime !== "" &&
    this.isDateValid(closingTime) && closingTime !== "" &&
    this.isOpeningTimeBeforeClosingTime(openingTime, closingTime) &&
    this.isGoalHigherThanCap(goal, cap);
  }
}


