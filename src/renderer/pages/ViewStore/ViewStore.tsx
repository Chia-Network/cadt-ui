import React, {useCallback, useEffect, useState} from "react";
import {BackButton, DatalayerStoreKeysTable, InvalidStoreIdErrorModal, SetStoreLabel, Spacer} from "@/components";
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Routes from "@/routes/route-constants";

const ViewStore: React.FC = () => {

  const [showInvalidStoreIdModal, setShowInvalidStoreIdModal] = useState(false);
  const navigate = useNavigate();
  const { data: ownedStores } = useGetOwnedStoresQuery({});
  const fallbackStoreProvider = useSelector((state: any) => state.userOptions.fallbackStoreProvider);
  const location = useLocation();
  const storeId = location.state?.storeId;

  useEffect(() => {
    if (!storeId){
      setShowInvalidStoreIdModal(true);
    }
  }, [storeId]);

  const handleInvalidStoreIdModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleViewKeyData = useCallback((key: string) => {
    if (storeId) {
      const dataPage: string = 'chia://' + storeId + '/' + key;
      navigate(Routes.KEY_PREVIEW, {
        state: {chiaUrl: dataPage, fallbackStoreProvider, ownedStores}
      });
    }
  }, [storeId, fallbackStoreProvider, ownedStores, navigate]);

  return (
    <>
      <div className={'flex flex-start mb-2'}>
        <BackButton/>
      </div>
      <SetStoreLabel storeId={storeId} />
      <Spacer size={10} />
      <DatalayerStoreKeysTable onViewKeyData={handleViewKeyData}/>
      <InvalidStoreIdErrorModal
        showModal={showInvalidStoreIdModal}
        setShowModal={setShowInvalidStoreIdModal}
        onClose={handleInvalidStoreIdModalClose}
      />
    </>
  );
}

export { ViewStore };
