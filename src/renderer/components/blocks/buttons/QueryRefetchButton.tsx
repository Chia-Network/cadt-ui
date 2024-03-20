import React from "react";
import {Button} from "@/components";
import {FormattedMessage} from "react-intl";

interface QueryRefetchButtonProps {
  onRefetch: () => void;
}

const QueryRefetchButton: React.FC<QueryRefetchButtonProps> = ({onRefetch}) => {
  return (
    <Button
      onClick={() => {onRefetch()}}
    >
      <FormattedMessage id={"unable-to-load-click-to-retry"} />
    </Button>
  );
}

export {QueryRefetchButton};
