import React from 'react';
import './css/ICOInfoPanel.css';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class ICOInfoPanel extends React.Component {

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    let icon = <FontAwesomeIcon size="2x" className="fa_info_icon" icon={faExclamationTriangle} />;

    return (
      <Card className="card">
        <CardHeader
          title="Important!"
          classes={{
            root: "card_header",
            title: "card_header_text"
          }}
          avatar={icon}
        />
        <CardContent
          classes={{
            root: "card_content"
          }}
        >
          <MuiThemeProvider theme={theme}>
            <Typography
              align="left"
              variant="subtitle1"
            >
              TokenMint ICO launcher deploys <strong>Capped-Minted-Refundable</strong> crowdsale!
            </Typography>
            <Typography
              align="left"
              variant="subtitle1"
            >
              For custom tailored ICO that best fits your needs, please contact us at <a href="mailto:merkleblue@gmail.com">merkleblue@gmail.com</a>
            </Typography>
          </MuiThemeProvider>
        </CardContent>
      </Card>
    );
  }
}




export default ICOInfoPanel;
