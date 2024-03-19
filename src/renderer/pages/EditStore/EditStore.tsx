import {
  Button,
  Card,
  Spinner,
  ToggleSwitch,
  Tooltip
} from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import {
  SetStoreLabel,
  Spacer,
  XTerm,
  FolderSelector, BackButton
} from '@/components';
import React, { useCallback, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {deployStore, DeployStoreParams} from '@/utils/os';
import {useLocation} from "react-router-dom";
import {SpendableCoinsInsufficientErrorModal} from "@/components";
import {SpendableCoinRequest} from "chia-wallet";
import {useGetSpendableCoinsImmediateMutation} from "@/api/ipc/wallet";
import {ConfirmDeployFolderModal} from "@/components";

const { ipcRenderer } = window.require('electron');

const EditStore: React.FC = () => {

  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedFolderSizeMb, setSelectedFolderSizeMb] = useState<number>(0);
  const [deployFee, setDeployFee] = useState<number>(0);
  const [showSpendableCoinsInsufficientModal, setShowSpendableCoinsInsufficientModal] =
    useState(false);
  const [showConfirmDeployFolderModal, setShowConfirmDeployFolderModal] = useState(false);
  const userOptions = useSelector((state: any) => state.userOptions);
  const [triggerGetSpendableCoins] = useGetSpendableCoinsImmediateMutation();
  const [log, setLog] = useState<string>('Waiting To Deploy...');
  const [deployMode, setDeployMode] = useState<string>('replace');
  const [deploying, setDeploying] = useState<boolean>(false);
  const location = useLocation();
  const storeId = location.state?.storeId;

  useEffect(() => {
    if (!storeId){
      console.error('EditStore received invalid storeId:', storeId);
    }
  }, [storeId]);

  useEffect(() => {
    const handleLogMessage = (_, message: string) => {
      if (deploying) {
        setLog(message);
      }

      if (message.includes('Deploy operation completed successfully.')) {
        setDeploying(false);
      }
    };

    ipcRenderer.on('logMessage', handleLogMessage);

    // Cleanup listener when component unmounts
    return () => {
      ipcRenderer.removeListener('logMessage', handleLogMessage);
    };
  }, [deploying]);

  const handleDeploy = useCallback(async () => {

    const spendableCoinRequest: SpendableCoinRequest = {wallet_id: 1};
    const spendableCoinsResponse = await triggerGetSpendableCoins(spendableCoinRequest);

    // @ts-ignore
    if (spendableCoinsResponse?.data?.confirmed_records?.length < 1) {
      setShowSpendableCoinsInsufficientModal(true);
      return;
    }

    const deployParams: DeployStoreParams = {
      storeId,
      deployDir: selectedPath,
      deployMode,
      blockChainFee: userOptions?.deployOptions?.defaultFee,
      options: userOptions.deployOptions,
    };

    setLog('Deploying...');
    setDeploying(true);
    deployStore(deployParams);
  }, [storeId, selectedPath, userOptions.deployOptions, deployMode, triggerGetSpendableCoins]);
  
  const handleSelectFolder = useCallback((selectedFolderPath: string, folderSizeMb: number, fee: number) => {
    setSelectedPath(selectedFolderPath);
    setSelectedFolderSizeMb(folderSizeMb);
    setDeployFee(fee);
  }, [setSelectedPath, setDeployFee])

  return (
    <>
      <div className={'flex flex-start mb-2'}>
        <BackButton/>
      </div>
      <Card>
        <SetStoreLabel storeId={storeId}/>
      </Card>
      <Spacer size={10}/>
      <Card>
        <FolderSelector onSelect={handleSelectFolder}/>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}
        >
          <ToggleSwitch
            checked={deployMode === 'replace'}
            onChange={() => {
              setDeployMode(
                deployMode === 'replace' ? 'additive' : 'replace',
              );
            }}
          />
          <Tooltip
            content={
              deployMode === 'replace'
                ? <FormattedMessage id="missing-files-in-project-folder-will-be-deleted-from-the-store"/>
                : <FormattedMessage
                  id="new-files-will-be-upserted,-but-missing-files-in-the-project-folder-will-not-be-deleted"/>
            }
          >
            <div style={{marginLeft: 10}}>
              {
                deployMode === 'replace'
                  ? <FormattedMessage id="deploy-mode---replace"/>
                  : <FormattedMessage id="deploy-mode---additive"/>
              }
            </div>
          </Tooltip>
        </div>
        <div style={{display: "flex", alignContent: "center", justifyContent: "left"}}>
          <Button
            disabled={deploying || !selectedPath}
            style={{width: 150}}
            onClick={() => setShowConfirmDeployFolderModal(true)}
          >
            {deploying ? (
              <div>
                {' '}
                <Spinner/>
              </div>
            ) : (
              <span style={{textTransform: 'capitalize'}}>
                <FormattedMessage id="deploy"/>
              </span>
            )}
          </Button>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "left", marginLeft: "10px"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "left"}}>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id="size"/>: {selectedFolderSizeMb.toFixed(2)} MB
              </p>
            </div>
            <Tooltip content={<FormattedMessage id={"0.01-xch-per-100-megabytes-deployed-min-fee-of-0.01-xch"}/>}>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <FormattedMessage id="fee"/>: {deployFee} XCH
              </p>
            </Tooltip>
          </div>
        </div>
        <XTerm log={log}/>
      </Card>
      <ConfirmDeployFolderModal
        showModal={showConfirmDeployFolderModal}
        setShowModal={setShowConfirmDeployFolderModal}
        folderSizeMb={selectedFolderSizeMb}
        fee={deployFee}
        onDeployFolder={handleDeploy}
      />
      <SpendableCoinsInsufficientErrorModal
        showModal={showSpendableCoinsInsufficientModal}
        setShowModal={setShowSpendableCoinsInsufficientModal}
      />
    </>
  );
};

export {EditStore};
