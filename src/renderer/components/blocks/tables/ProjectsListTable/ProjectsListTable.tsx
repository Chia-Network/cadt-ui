import React, {useMemo, useState} from "react";
import {FormattedMessage} from "react-intl";
import {DataTable} from "@/components";

const ProjectsListTable: React.FC = () => {

  const ReloadButton: React.FC = () => {
    return (
      <Button
        onClick={() => {
          refetchSubscriptions();
        }}
      >
        <FormattedMessage id={"unable-to-load-click-to-retry"} />
      </Button>
    );
  }

  const columns = useMemo(() => [
    {
      title: <FormattedMessage id={"current-registry"}/>,
      key: "currentRegistry",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-id"}/>,
      key: "projectId",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-name"}/>,
      key: "projectName",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-developer"}/>,
      key: "projectDeveloper",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"sector"}/>,
      key: "sector",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-type"}/>,
      key: "projectType",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-tags"}/>,
      key: 'projectTags',
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"covered-by-ndc"}/>,
      key: "coveredByNdc",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"project-status"}/>,
      key: "projectStatus",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"unit-metric"}/>,
      key: "unitMetric",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
    {
      title: <FormattedMessage id={"validation-body"}/>,
      key: "validationBody",
      render: (row: any) => {
        return (
          <>placeholder</>
        );
      }
    },
  ], []);

  return (
    <>
      {subscriptionQueryLoading
        ? <LoadingSpinnerCard/>
        : // not loading, handle error or display data
        (getSubscriptionsError || !subscriptionsData?.success
            ? <ReloadButton/>
            : <DataTable columns={columns} data={subscriptionsData?.store_ids} isLoading={subscriptionQueryLoading}/>
        )
      }
    </>
  );
}

export {ProjectsListTable};
