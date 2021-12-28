import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { Tabs, Tab, TabPanel } from '..';
import {
  CreateQualificationsForm,
  ComponentRepeater,
  AddIcon,
  CloseIcon,
  CreateVintageForm,
} from '..';

const FormWrapper = withTheme(
  ({
    children,
    tabLabel,
    setQualificationsData,
    qualificationData,
    vintageData,
    setVintageData,
  }) => {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };
    return (
      <div>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example">
          <Tab label={`${tabLabel}`} />
          <Tab label="Qualifications" />
          <Tab label="Vintage" />
        </Tabs>
        <div>
          <TabPanel value={tabValue} index={0}>
            {children}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <div style={{ padding: '20px 30px' }}>
              <ComponentRepeater
                values={qualificationData}
                updateValues={setQualificationsData}
                initialValue={{
                  label: '',
                  creditingPeriodStartDate: '',
                  creditingPeriodEndDate: '',
                  validityStartDate: '',
                  validityEndDate: '',
                  unityQuantity: '',
                  qualificationLink: '',
                }}
                component={
                  <CreateQualificationsForm
                    onChange={value => console.log(value)}
                  />
                }
                addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
                removeIcon={
                  <CloseIcon height={12} width={12} fill={'#1890FF'} />
                }
              />
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <div style={{ padding: '20px 30px' }}>
              <ComponentRepeater
                values={vintageData}
                updateValues={setVintageData}
                initialValue={{
                  vintageStartDate: '',
                  vintageEndDate: '',
                  verificationApproach: '',
                  verificationDate: '',
                  verificationBody: '',
                }}
                component={<CreateVintageForm />}
                addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
                removeIcon={
                  <CloseIcon height={12} width={12} fill={'#1890FF'} />
                }
              />
            </div>
          </TabPanel>
        </div>
      </div>
    );
  },
);

export { FormWrapper };
