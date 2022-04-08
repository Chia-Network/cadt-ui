import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  padding: 30px;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <StyledContainer>
          <h2>
            <FormattedMessage id="something-went-wrong" />
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </StyledContainer>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
