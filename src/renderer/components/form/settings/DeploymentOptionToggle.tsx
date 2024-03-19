import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDeploymentSetting} from "@/store/slices/userOptions";
import {Checkbox, Label} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {Spacer} from "@/components";
import {DeploymentSettingPayload, SettingToggleProps} from "@/vite-env";
import {LabelBox} from "@/components";

const DeploymentOptionToggle: React.FC<SettingToggleProps> = (
  { labelTranslationId, settingKey }) => {

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: settingKey,
      value: !deployOptions[settingKey]
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, settingKey, deployOptions]);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <LabelBox>
          <Label htmlFor={settingKey}>
            <FormattedMessage id={labelTranslationId} />
          </Label>
        </LabelBox>
        <Checkbox
          id={settingKey}
          onChange={handleOnChange}
          checked={deployOptions[settingKey]}
        />
      </div>
      <Spacer size={5}/>
    </>
  );
}

export { DeploymentOptionToggle };
