import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDeploymentSetting} from "@/store/slices/userOptions";
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import {Button, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {
  LabelBox,
  SettingHorizontalFlexBox,
  Spacer,
  textInputStyle
} from "@/components";
import {DeploymentSettingPayload, SettingTextInputProps} from "@/vite-env";

const DeployOptionInput: React.FC<SettingTextInputProps> = (
  { labelTranslationId, settingKey, inputType }) => {

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: settingKey,
      value: event.target.value
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, settingKey]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: settingKey,
      value: initialState.deployOptions[settingKey]
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, settingKey]);

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
          value={deployOptions?.[settingKey] || ''}
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

export { DeployOptionInput };
