import {expect} from 'chai';
import InputValidator from './InputValidator';

let validTokenName, validTokenSymbol, validDecimals, validTotalSupply, validTokenOwner;
describe('test InputValidator', () => {
  before(() => {
    validTokenName = "The First Amendment";
    validTokenSymbol = "TFA";
    validDecimals = "18";
    validTotalSupply = "1000";
    validTokenOwner = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
  });

  ////////// token name tests
  it ('is invalid token name - too short', () => {
    expect(InputValidator.isTokenNameValid('AA')).to.be.false;
  });
  it ('is invalid token name - non-alphanumerical characters', () => {
    expect(InputValidator.isTokenNameValid('test@')).to.be.false;
  });
  it ('is invalid token name - non-alphanumerical characters', () => {
    expect(InputValidator.isTokenNameValid('test@')).to.be.false;
  });
  it ('is invalid token name - with underscore', () => {
    expect(InputValidator.isTokenNameValid('TestName_021')).to.be.false;
  });
  it ('is invalid token name - starts with whitespace', () => {
    expect(InputValidator.isTokenNameValid(' TestName')).to.be.false;
  });
  it ('is invalid token name - starts with tab', () => {
    expect(InputValidator.isTokenNameValid('  TestName')).to.be.false;
  });
  it ('is valid token name - empty string', () => {
    expect(InputValidator.isTokenNameValid('')).to.be.true;
  });
  it ('is valid token name - only chars', () => {
    expect(InputValidator.isTokenNameValid('TestName')).to.be.true;
  });
  it ('is valid token name - chars and numbers', () => {
    expect(InputValidator.isTokenNameValid('TestName021')).to.be.true;
  });
  it ('is valid token name - with whitespace', () => {
    expect(InputValidator.isTokenNameValid('TestName 021')).to.be.true;
  });
  it ('is valid token name - ends with whitespace', () => {
    expect(InputValidator.isTokenNameValid('TestName 021 ')).to.be.true;
  });
  it ('is valid token name - ends with tab', () => {
    expect(InputValidator.isTokenNameValid('TestName 021  ')).to.be.true;
  });
  it ('is valid token name - with hyphen', () => {
    expect(InputValidator.isTokenNameValid('TestName-021-')).to.be.true;
  });

  ////////// token symbol tests
  it ('is invalid token symbol - too short', () => {
    expect(InputValidator.isTokenSymbolValid('AA')).to.be.false;
  });
  it ('is invalid token symbol - non-alphanumerical characters', () => {
    expect(InputValidator.isTokenSymbolValid('AA$')).to.be.false;
  });
  it ('is invalid token symbol - with hyphen', () => {
    expect(InputValidator.isTokenSymbolValid('A-A')).to.be.false;
  });
  it ('is invalid token symbol - with underscore', () => {
    expect(InputValidator.isTokenSymbolValid('A_A')).to.be.false;
  });
  it ('is invalid token symbol - with whitespace', () => {
    expect(InputValidator.isTokenSymbolValid('A A')).to.be.false;
  });
  it ('is invalid token symbol - starts with whitespace', () => {
    expect(InputValidator.isTokenSymbolValid(' AA')).to.be.false;
  });
  it ('is invalid token symbol - ends with whitespace', () => {
    expect(InputValidator.isTokenSymbolValid('AA ')).to.be.false;
  });
  it ('is invalid token symbol - starts with tab', () => {
    expect(InputValidator.isTokenSymbolValid('  AA')).to.be.false;
  });
  it ('is invalid token symbol - ends with tab', () => {
    expect(InputValidator.isTokenSymbolValid('AA  ')).to.be.false;
  });
  it ('is valid token symbol - only chars', () => {
    expect(InputValidator.isTokenSymbolValid('AAA')).to.be.true;
  });
  it ('is valid token symbol - chars and numbers', () => {
    expect(InputValidator.isTokenSymbolValid('AAA9')).to.be.true;
  });
  it ('is valid token symbol - empty string', () => {
    expect(InputValidator.isTokenSymbolValid('')).to.be.true;
  });
  it ('is token symbol not unique - existing symbol', () => {
    expect(InputValidator.isTokenSymbolUnique('ETH')).to.be.false;
  });
  it ('is token symbol unique - non existing symbol', () => {
    expect(InputValidator.isTokenSymbolUnique('aq1')).to.be.true;
  });

  ////////// decimals tests
  it ('is invalid decimals - non-number', () => {
    expect(InputValidator.isDecimalsValid('AA')).to.be.false;
  });
  it ('is invalid decimals - starts with whitespace', () => {
    expect(InputValidator.isDecimalsValid(' 1')).to.be.false;
  });
  it ('is invalid decimals - with whitespace', () => {
    expect(InputValidator.isDecimalsValid('1 2')).to.be.false;
  });
  it ('is invalid decimals - ends with whitespace', () => {
    expect(InputValidator.isDecimalsValid('1 ')).to.be.false;
  });
  it ('is invalid decimals - starts with tab', () => {
    expect(InputValidator.isDecimalsValid(' 1')).to.be.false;
  });
  it ('is invalid decimals - ends with tab', () => {
    expect(InputValidator.isDecimalsValid('1  ')).to.be.false;
  });
  it ('is invalid decimals - with hyphen', () => {
    expect(InputValidator.isDecimalsValid('1-1')).to.be.false;
  });
  it ('is invalid decimals - with underscore', () => {
    expect(InputValidator.isDecimalsValid('1_1')).to.be.false;
  });
  it ('is invalid decimals - floating point number', () => {
    expect(InputValidator.isDecimalsValid('1.1')).to.be.false;
  });
  it ('is invalid decimals - negative number', () => {
    expect(InputValidator.isDecimalsValid('-1')).to.be.false;
  });
  it ('is invalid decimals - value too high', () => {
    expect(InputValidator.isDecimalsValid('51')).to.be.false;
  });
  it ('is valid decimals - minimum value', () => {
    expect(InputValidator.isDecimalsValid('0')).to.be.true;
  });
  it ('is valid decimals - maximum value', () => {
    expect(InputValidator.isDecimalsValid('50')).to.be.true;
  });
  it ('is valid decimals - empty string', () => {
    expect(InputValidator.isDecimalsValid('')).to.be.true;
  });

  ////////// total supply tests
  it ('is invalid total supply - non-number', () => {
    expect(InputValidator.isTotalSupplyValid('AA')).to.be.false;
  });
  it ('is invalid total supply - starts with whitespace', () => {
    expect(InputValidator.isTotalSupplyValid(' 1')).to.be.false;
  });
  it ('is invalid total supply - with whitespace', () => {
    expect(InputValidator.isTotalSupplyValid('1 2')).to.be.false;
  });
  it ('is invalid total supply - ends with whitespace', () => {
    expect(InputValidator.isTotalSupplyValid('1 ')).to.be.false;
  });
  it ('is invalid total supply - starts with tab', () => {
    expect(InputValidator.isTotalSupplyValid(' 1')).to.be.false;
  });
  it ('is invalid total supply - ends with tab', () => {
    expect(InputValidator.isTotalSupplyValid('1  ')).to.be.false;
  });
  it ('is invalid total supply - with hyphen', () => {
    expect(InputValidator.isTotalSupplyValid('1-1')).to.be.false;
  });
  it ('is invalid total supply - with underscore', () => {
    expect(InputValidator.isTotalSupplyValid('1_1')).to.be.false;
  });
  it ('is invalid total supply - floating point number', () => {
    expect(InputValidator.isTotalSupplyValid('1.1')).to.be.false;
  });
  it ('is invalid total supply - negative number', () => {
    expect(InputValidator.isTotalSupplyValid('-1')).to.be.false;
  });
  it ('is invalid total supply - value too high', () => {
    expect(InputValidator.isTotalSupplyValid('1000000000000001')).to.be.false;
  });
  it ('is valid total supply - zero value', () => {
    expect(InputValidator.isTotalSupplyValid('0')).to.be.false;
  });
  it ('is valid total supply - minimum value', () => {
    expect(InputValidator.isTotalSupplyValid('1')).to.be.true;
  });
  it ('is valid total supply - maximum value', () => {
    expect(InputValidator.isTotalSupplyValid('1000000000000000')).to.be.true;
  });
  it ('is valid total supply - empty string', () => {
    expect(InputValidator.isTotalSupplyValid('')).to.be.true;
  });

  ////////// input tests
  it ('is invalid input - empty token name', () => {
    expect(InputValidator.isInputValid('', validTokenSymbol, validDecimals, validTotalSupply, validTokenOwner)).to.be.false;
  });
  it ('is invalid input - empty token symbol', () => {
    expect(InputValidator.isInputValid(validTokenName, '', validDecimals, validTotalSupply, validTokenOwner)).to.be.false;
  });
  it ('is invalid input - empty decimals', () => {
    expect(InputValidator.isInputValid(validTokenName, validTokenSymbol, '', validTotalSupply, validTokenOwner)).to.be.false;
  });
  it ('is invalid input - empty total supply', () => {
    expect(InputValidator.isInputValid(validTokenName, validTokenSymbol, validDecimals, '', validTokenOwner)).to.be.false;
  });
  it ('is valid input', () => {
    expect(InputValidator.isInputValid(validTokenName, validTokenSymbol, validDecimals, validTotalSupply, validTokenOwner)).to.be.true;
  });

  ////////// date tests
  it ('is valid date format - valid date', () => {
    expect(InputValidator.isDateFormatValid("2018-02-02")).to.be.true;
  });

  it ('is valid date format - invalid date', () => {
    expect(InputValidator.isDateFormatValid("Blah")).to.be.false;
  });
});
