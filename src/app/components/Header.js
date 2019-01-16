import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';
import { Typography } from '@material-ui/core';
import ethereum from '../img/ethereum.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Header extends React.Component {

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    const title = this.props.isIco ? "Your own ICO powered by" : "Your own Token powered by";

    return (
      <div className="header_div">
        <div className="logo_div">
          <a href="../"><img className="logo_header" src={logo} alt="" /></a>
        </div>
        {!this.props.isMobileDevice &&
          <div className="caption_div">
            <div className="ethereum_div">
              <img src={ethereum} alt="" />
            </div>
            <div className="typography_div">
              <MuiThemeProvider theme={theme}>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  gutterBottom
                  className="typography_header"
                >
                  {title}
                </Typography>
              </MuiThemeProvider>
            </div>
          </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  isMobileDevice: PropTypes.bool.isRequired,
  isIco: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isMobileDevice: state.isMobileDevice,
    isIco: ownProps.isIco
  };
}

export default connect(mapStateToProps)(Header);

