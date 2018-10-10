export default class InputValidator {

  static isTokenNameValid(tokenName) {
    if (tokenName === "") {
      return true;
    }
    return /^[a-z0-9]+$/i.test(tokenName) && tokenName.length >= 3;
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
    return n !== Infinity && String(n) === totalSupply && n > 0 && n <= 9999999999;
  }

  static isInputValid(tokenName, tokenSymbol, decimals, totalSupply, tokenOwner) {
    return this.isTokenNameValid(tokenName) && tokenName !== "" &&
      this.isTokenSymbolValid(tokenSymbol) && tokenSymbol !== "" &&
      this.isDecimalsValid(decimals) && decimals !== "" &&
      this.isTotalSupplyValid(totalSupply) && totalSupply !== "" &&
      tokenOwner !== "";
  }
}
