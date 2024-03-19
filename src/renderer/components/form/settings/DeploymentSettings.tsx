import {Card} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {DeploymentOptionToggle, DeployOptionInput, Spacer} from "@/components";

const DeploymentSettings: React.FC = () => {
  return (
    <Card>
      <h5>
        <FormattedMessage id="deployment-settings" />
      </h5>
      <Spacer size={5}/>
      <DeployOptionInput
        labelTranslationId={'datalayer-host'}
        settingKey={'datalayerHost'}
        inputType={'text'}
      />
      <DeployOptionInput
        labelTranslationId={'wallet-host'}
        settingKey={'walletHost'}
        inputType={'text'}
      />
      <DeployOptionInput
        labelTranslationId={'certificate-folder-path'}
        settingKey={'certificateFolderPath'}
        inputType={'text'}
      />
      <DeployOptionInput
        labelTranslationId={'default-wallet-id'}
        settingKey={'defaultWalletId'}
        inputType={'number'}
      />
      <DeployOptionInput
        labelTranslationId={'default-fee-(in-mojos)'}
        settingKey={'defaultFee'}
        inputType={'number'}
      />
      <DeployOptionInput
        labelTranslationId={'default-mirror-coin-amount'}
        settingKey={'defaultMirrorCoinAmount'}
        inputType={'number'}
      />
      <DeployOptionInput
        labelTranslationId={'maximum-rpc-payload-size'}
        settingKey={'maximumRpcPayloadSize'}
        inputType={'number'}
      />
      <DeployOptionInput
        labelTranslationId={'web-2-gateway-port'}
        settingKey={'web2GatewayPort'}
        inputType={'number'}
      />
      <DeployOptionInput
        labelTranslationId={'web-2-gateway-host'}
        settingKey={'web2GatewayHost'}
        inputType={'text'}
      />
      <DeployOptionInput
        labelTranslationId={'mirror-url-override'}
        settingKey={'mirrorUrlOverride'}
        inputType={'text'}
      />
      <DeployOptionInput
        labelTranslationId={'num-files-processed-per-batch'}
        settingKey={'numFilesProcessedPerBatch'}
        inputType={'number'}
      />
      <DeploymentOptionToggle
        labelTranslationId={'force-ip4-mirror'}
        settingKey={'forceIp4Mirror'}
      />
      <DeploymentOptionToggle
        labelTranslationId={'ignore-orphans'}
        settingKey={'ignoreOrphans'}
      />
      <DeploymentOptionToggle
        labelTranslationId={'verbose'}
        settingKey={'verbose'}
      />
    </Card>
  );
}

export { DeploymentSettings };