import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import { setFallbackStoreProvider} from "@/store/slices/userOptions";
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import {Button, Card, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {SettingTextInputProps} from "@/vite-env";
import {LabelBox, SettingHorizontalFlexBox, Spacer, textInputStyle} from "@/components";

//todo: make this component generic. Specific to fallbackStoreProvider currently
const Web2GateWaySettingInput: React.FC<SettingTextInputProps> = (
  { labelTranslationId, settingKey, inputType }: SettingTextInputProps) => {

  const dispatch = useDispatch();
  const userOptionsSlice = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setFallbackStoreProvider(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setFallbackStoreProvider(initialState.fallbackStoreProvider));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor={settingKey}>
            <FormattedMessage id={labelTranslationId} />
          </Label>
        </LabelBox>
        <TextInput
          id={settingKey}
          type={inputType}
          value={userOptionsSlice.fallbackStoreProvider}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const Web2GatewaySettings: React.FC = () => {

  return (
    <Card>
      <h5>
        <FormattedMessage id="web2-gateway-settings" />
      </h5>
      <Spacer size={5}/>
      <Web2GateWaySettingInput
        labelTranslationId={'fallback-store-provider'}
        settingKey={'fallbackStoreProvider (key not used)'}
        inputType={'text'}
      />
    </Card>
  );
};

export { Web2GatewaySettings };