import React, {useState} from "react";
import {CreateDlStoreButton, OwnedStoresTable, Spacer} from "@/components";

const MyStores: React.FC = () => {

  const [storeTableContentsLoaded, setStoreTableContentsLoaded] = useState<boolean>(false);

  return (
    <>
      <Spacer size={10}/>
      { storeTableContentsLoaded &&
        <>
          <CreateDlStoreButton/>
          <Spacer size={10}/>
        </>
      }
      <OwnedStoresTable
        setTableContentsLoaded={setStoreTableContentsLoaded}
      />
      <Spacer size={10}/>
    </>
  );
};

export {MyStores};