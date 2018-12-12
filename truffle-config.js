module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    local: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      //gas: 0xfffffffffff,
      //gasPrice: 0x01,
    },
    ropsten: {
      network_id: 3,
      host: '127.0.0.1',
      port: 8545,
      gas: 6000000
    },
    //solc: {
    //  optimizer: {
    //    enabled: true,
    //    runs: 200
    //  }
    }
  }
};
