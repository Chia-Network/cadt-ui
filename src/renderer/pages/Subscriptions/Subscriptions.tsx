import { Spacer, SubscriptionsTable} from "@/components";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useGetOwnedStoresQuery, useSubscribeMutation} from "@/api/ipc/datalayer";
import {AddSubscriptionErrorModal} from "@/components";

const Subscriptions: React.FC = () => {

  const [subscriptionStoreIdToAdd, setSubscriptionStoreIdToAdd] = useState<string>('');
  const [subscriptionsLoaded, setSubscriptionsLoaded] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [storeIsOwned, setStoreIsOwned] = useState(false);

  const storeInputRef = useRef<HTMLInputElement>(null);

  const [triggerSubscribe, {
    data: subscribeMutationData,
    isLoading: subscribeMutationLoading
  }] = useSubscribeMutation();
  const {
    data: ownedStoresData,
    isLoading: ownedStoresQueryLoading,
    error: ownedStoresQueryError
  } = useGetOwnedStoresQuery({});

  const handleTextInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionStoreIdToAdd(event.target.value || '');
  }, []);

  const handleStoreIsOwned = useCallback(() => {
    setShowErrorModal(true);
    if (storeInputRef?.current?.value){
      storeInputRef.current.value = '';
    }
  }, [setShowErrorModal, storeInputRef])

  const handleAddSubscription = useCallback(() => {
    const storeOwned: boolean = ownedStoresData?.store_ids.includes(subscriptionStoreIdToAdd);
    setStoreIsOwned(storeOwned);
    storeOwned ? handleStoreIsOwned() : triggerSubscribe({id: subscriptionStoreIdToAdd});
  }, [triggerSubscribe, subscriptionStoreIdToAdd, handleStoreIsOwned, ownedStoresData]);

  useEffect(() => {
    if (subscribeMutationData?.error){
      setShowErrorModal(true);
    }
  }, [subscribeMutationData]);

  useEffect(() => {
    if (subscribeMutationData?.success) {
      setSubscriptionStoreIdToAdd('');
      if (storeInputRef?.current?.value) {
        storeInputRef.current.value = '';
      }
    }
  }, [subscribeMutationData]);

  return (
    <>
      {subscriptionsLoaded &&
        <div style={{display: "flex"}}>
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            inlineSize: 'min-content',
            whiteSpace: 'nowrap'
          }}>
            <Tooltip content={<FormattedMessage id={"add-store-subscription"}/>}>
              <p>
                <FormattedMessage id={"store-id"}/>
              </p>
            </Tooltip>
          </div>
          <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
            <TextInput ref={storeInputRef} onChange={handleTextInputChange}/>
          </div>
          <Button
            disabled={subscriptionStoreIdToAdd.length < 64 || subscriptionStoreIdToAdd.length > 64}
            isProcessing={subscribeMutationLoading || ownedStoresQueryLoading}
            onClick={() => handleAddSubscription()}
            style={{inlineSize: 'min-content', whiteSpace: 'nowrap'}}
          >
            <FormattedMessage id={"add-store-subscription"}/>
          </Button>
        </div>
      }
      <Spacer size={10}/>
      <SubscriptionsTable setTableContentsLoaded={setSubscriptionsLoaded}/>
      <AddSubscriptionErrorModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        errorMessage={
          subscribeMutationData?.error ||
          ownedStoresQueryError ||
          (storeIsOwned && <FormattedMessage id={'you-cannot-subscribe-to-your-own-store'}/>)
        }
      />
    </>
  );
}

export {Subscriptions}