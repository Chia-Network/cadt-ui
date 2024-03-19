import {Modal} from "flowbite-react";
import React, {useCallback} from "react";
import {FormattedMessage} from "react-intl";
import {usePluginsQuery} from "@/api/ipc/datalayer";
import {useGetConfigQuery} from "@/api/ipc/wallet";
import {FauxLinkButton} from "@/components";

const ChiaNotAccessibleModal: React.FC = () => {

  const handleOpenChiaDownloads = useCallback(() => {
    window.open("https://www.chia.net/downloads/", 'Chia Downloads', "nodeIntegration=no");
  }, []);

  const {
    data: datalayerResponse,
    error: datalayerQueryError,
  } = usePluginsQuery({}, {pollingInterval: 6000});
  const {
    data: walletResponse,
    error: walletQueryError,
  } = useGetConfigQuery({wallet_id: 1}, {pollingInterval: 7500});

  let datalayerFailure = false;
  if (datalayerResponse){
    datalayerFailure = !datalayerResponse?.success;
  }

  const chiaInaccessible: boolean =
    Boolean(datalayerFailure || !walletResponse || datalayerQueryError || walletQueryError);

  return (
    <Modal show={chiaInaccessible} dismissible={false}>
      <div className={'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5'}>
        <FormattedMessage id={"ensure-chia-services-are-running-and-accessible"}/>
      </div>
      <Modal.Body>
        <div className={'space-y-6'}>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage id={"sprout-ui-cannot-detect-a-running-chia-instance"}/>
          </p>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage
              id={"please-check-that-chia-is-running-ports-8562-and-9256-are-not-blocked-" +
                "and-sprout-ui-has-permission-to-accept-incoming-connections"}/>
          </p>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage id={"if-you-need-to-install-chia-downloads-for-all-platforms-can-be-found-at"}/>
            <FauxLinkButton onClick={handleOpenChiaDownloads}>
              <FormattedMessage id={"the-official-downloads-page"}/>
            </FauxLinkButton>.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { ChiaNotAccessibleModal };