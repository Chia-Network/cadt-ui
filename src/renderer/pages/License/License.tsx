import { Button, TextInput, Card } from 'flowbite-react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccessKey,
  getAccessSecret,
  setAccessKey,
  setAccessSecret,
} from '@/store/slices/userOptions';
import { Spacer } from '@/components';

const SettingsDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

interface SettingsProps {}

interface AccessSettingsProps {}

const AccessSettings: React.FC<AccessSettingsProps> = () => {
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
        <FormattedMessage id="data-layer-storage-settings" />
      </h5>
      <div>
        <div className="mb-2 block">
          <FormattedMessage id="access-key" />
        </div>
        <TextInput
          id="acessKey"
          type="text"
          ref={accessKeyTextInput}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <FormattedMessage id="access-secret" />
        </div>
        <TextInput
          id="accessSecret"
          type="text"
          ref={accessSecretTextInput}
          required
        />
      </div>
      <div style={{ height: '20px' }} />
      <Button type="submit" onClick={onSave} style={{ width: '100%' }}>
        <FormattedMessage id="save" />
      </Button>
    </Card>
  );
};

const License: React.FC<SettingsProps> = () => {
  return (
    <SettingsDiv>
      <div style={{ width: '100%' }}>
        <Spacer size={10} />
        <AccessSettings />
        <Spacer size={10} />
      </div>
    </SettingsDiv>
  );
};

export { License };
