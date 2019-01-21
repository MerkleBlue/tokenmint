import React from 'react';
import {
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import './css/TokenInfo.css';
import TokenName from './TokenName'; //eslint-disable-line import/no-named-as-default
import TokenSymbol from './TokenSymbol'; //eslint-disable-line import/no-named-as-default
import TokenDecimals from './TokenDecimals'; //eslint-disable-line import/no-named-as-default
import TokenRate from './TokenRate'; //eslint-disable-line import/no-named-as-default

export class ICOTokenAttributesPanel extends React.Component {

  render() {
    return (
      <Card className="card">
        <CardHeader
          title="Token Attributes"
          classes={{
            root: "card_header",
            title: "card_header_text"
          }}
        />
        <CardContent
          classes={{
            root: "card_content"
          }}
        >
          <TokenName />
          <TokenSymbol />
          <TokenRate />
        </CardContent>
      </Card>
    );
  }
}

export default ICOTokenAttributesPanel;
