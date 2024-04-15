import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Field } from '@/components';
import { Unit } from '@/schemas/Unit.schema';
import { Card } from '@/components';

const validationSchema = yup.object({
  projectName: yup.string(),
});

interface UnitFormProps {
  onSubmit: () => Promise<any>;
  readonly?: boolean;
  data: Unit;
}

const UnitForm: React.FC<UnitFormProps> = ({ readonly = false, data }) => {
  return (
    <Formik initialValues={{ apiHost: '', apiKey: '' }} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {/* prettier-ignore */}
                <Field name="projectLocationId" label="Project Location Id" type="text" readonly={readonly} initialValue={data.projectLocationId} />
                {/* prettier-ignore */}
                <Field name="unitOwner" label="Unit Owner" type="text" readonly={readonly} initialValue={data.unitOwner} />
                {/* prettier-ignore */}
                <Field name="unitBlockStart" label="Unit Block Start" type="text" readonly={readonly} initialValue={data.unitBlockStart} />
                {/* prettier-ignore */}
                <Field name="unitBlockEnd" label="Unit Block End" type="text" readonly={readonly} initialValue={data.unitBlockEnd} />
                {/* prettier-ignore */}
                <Field name="unitCount" label="Unit Count" type="text" readonly={readonly} initialValue={data.unitCount} />
                {/* prettier-ignore */}
                <Field name="serialNumberBlock" label="Serial Number Block" type="text" readonly={readonly} initialValue={data.serialNumberBlock} />
                {/* prettier-ignore */}
                <Field name="countryJurisdictionOfOwner" label="Country Jurisdiction Of Owner" type="text" readonly={readonly} initialValue={data.countryJurisdictionOfOwner} />
                {/* prettier-ignore */}
                <Field name="inCountryJurisdictionOfOwner" label="In-Country Jurisdiction Of Owner" type="text" readonly={readonly} initialValue={data.inCountryJurisdictionOfOwner} />
                {/* prettier-ignore */}
                <Field name="unitType" label="Unit Type" type="text" readonly={readonly} initialValue={data.unitType} />
                {/* prettier-ignore */}
                <Field name="unitStatusReason" label="Unit Status Reason" type="text" readonly={readonly} initialValue={data.unitStatusReason} />
                {/* prettier-ignore */}
                <Field name="vintageYear" label="Unit Status Reason" type="text" readonly={readonly} initialValue={data.vintageYear} />
              </div>
              <div>
                <Field
                  name="unitRegistryLink"
                  label="Unit Registry Link"
                  type="link"
                  readonly={readonly}
                  initialValue={data.unitRegistryLink}
                />
              </div>
            </Card>
            <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {/* prettier-ignore */}
                <Field name="marketplace" label="Marketplace" type="text" readonly={readonly} initialValue={data.marketplace} />
                {/* prettier-ignore */}
                <Field name="marketplaceIdentifier" label="Marketplace Identifier" type="text" readonly={readonly} initialValue={data.marketplaceIdentifier} />
                {/* prettier-ignore */}
                <Field name="marketplaceLink" label="Marketplace Link" type="text" readonly={readonly} initialValue={data.marketplaceLink} />
                {/* prettier-ignore */}
                <Field name="correspondingAdjustmentStatus" label="Corresponding Adjustment Status" type="text" readonly={readonly} initialValue={data.correspondingAdjustmentStatus} />
                {/* prettier-ignore */}
                <Field name="correspondingAdjustmentDeclaration" label="Corresponding Adjustment Declaration" type="text" readonly={readonly} initialValue={data.correspondingAdjustmentDeclaration} />
              </div>
            </Card>
            <Card>
              {/* prettier-ignore */}
              <Field name="unitTags" label="Unit Tags" type="tag" readonly={readonly} initialValue={data.unitTags} />
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { UnitForm };
