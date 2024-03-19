import React from "react";
import {Card, Spinner} from "flowbite-react";
import {FormattedMessage} from "react-intl";

const LoadingSpinnerCard: React.FC = () => {

  return (
    <>
      <Card>
        <Spinner/>
        <FormattedMessage id={"loading-..."}/>
      </Card>
    </>
  );
}

export { LoadingSpinnerCard };