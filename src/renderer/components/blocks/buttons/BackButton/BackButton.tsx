import React from "react";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {Button} from "flowbite-react";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return(
    <Button size={'sm'} onClick={() => navigate(-1)}>
      <FormattedMessage id={'back'}/>
    </Button>
  );
}

export { BackButton };