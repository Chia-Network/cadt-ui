import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import {getAccessKey, getAccessSecret, setAccessKey, setAccessSecret} from "@/store/slices/userOptions";
import {Button, Card, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {Spacer} from "@/components";

const AccessSettings: React.FC = () => {
  const dispatch = useDispatch();
  const accessKeyTextInput = useRef<HTMLInputElement>(null);
  const accessSecretTextInput = useRef<HTMLInputElement>(null);
  const accessKey = useSelector((state: any) => getAccessKey(state));
  const accessSecret = useSelector((state: any) => getAccessSecret(state));

  useEffect(() => {
    if (accessKeyTextInput.current && accessSecretTextInput.current) {
      accessKeyTextInput.current.value = accessKey;
      accessSecretTextInput.current.value = accessSecret;
    }
  }, [accessKeyTextInput, accessSecretTextInput, accessSecret, accessKey]);

  const onSave = useCallback(() => {
    if (accessKeyTextInput.current && accessSecretTextInput.current) {
      if (
        accessKeyTextInput.current.value != '' &&
        accessSecretTextInput.current.value != ''
      ) {
        dispatch(setAccessKey(accessKeyTextInput.current.value as string));
        dispatch(
          setAccessSecret(accessSecretTextInput.current.value as string),
        );
      }
    }
  }, [dispatch]);

  return (
    <Card>
      <h5>
        <FormattedMessage id="access-settings" />
      </h5>
      <Spacer size={5}/>
      <div>
        <Label htmlFor={"accessKey"}>
          <FormattedMessage id="access-key" />
        </Label>
        <TextInput
          id="acessKey"
          type="text"
          ref={accessKeyTextInput}
          required
        />
      </div>
      <Label>
        <Label htmlFor={"accessSecret"}>
          <FormattedMessage id="access-secret" />
        </Label>
        <TextInput
          id="accessSecret"
          type="text"
          ref={accessSecretTextInput}
          required
        />
      </Label>
      <div style={{ height: '20px' }} />
      <Button type="submit" onClick={onSave} style={{ width: '100%' }}>
        <FormattedMessage id="save" />
      </Button>
    </Card>
  );
};

export { AccessSettings };
