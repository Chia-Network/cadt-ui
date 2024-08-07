import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { UnitSplit } from '@/schemas/Unit.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';
import { useIntl } from 'react-intl';

const validationSchema = yup.object({
  units: yup.array().of(
    yup.object({
      unitCount: yup.number().required('Number of Units is required'),
      unitOwner: yup.string().required('Unit Owner is required'),
      unitBlockStart: yup.string().required('Unit Block Start is required'),
      unitBlockEnd: yup.string().required('Unit Block End is required'),
      countryJurisdictionOfOwner: yup.string().nullable(),
      inCountryJurisdictionOfOwner: yup.string().nullable(),
    }),
  ),
});

interface SplitUnitFormProps {
  picklistOptions?: PickList | null;
}

export interface SplitUnitFormRef {
  submitForm: () => Promise<any>;
}

const SplitUnitForm = forwardRef<SplitUnitFormRef, SplitUnitFormProps>(({ picklistOptions }, ref) => {
  const intl = useIntl();
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    submitForm: async () =>
      deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'units'), [
        'orgUid',
        'warehouseProjectId',
        'timeStaged',
      ]),
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ units: [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<UnitSplit>
            name="units"
            maxNumber={5}
            minNumber={3}
            readonly={false}
            initialValue={[
              {
                unitCount: 0,
                unitOwner: null,
                unitBlockStart: null,
                unitBlockEnd: null,
                countryJurisdictionOfOwner: null,
                inCountryJurisdictionOfOwner: null,
              },
              {
                unitCount: 0,
                unitOwner: null,
                unitBlockStart: null,
                unitBlockEnd: null,
                countryJurisdictionOfOwner: null,
                inCountryJurisdictionOfOwner: null,
              },
            ]}
            itemTemplate={{
              unitCount: 0,
              unitOwner: null,
              unitBlockStart: null,
              unitBlockEnd: null,
              countryJurisdictionOfOwner: null,
              inCountryJurisdictionOfOwner: null,
            }}
          >
            {(_, index, name) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <span>Record {index}</span>
                  <Field name={`${name}[${index}].unitCount`} required={true} label="# of Units" type="number" />
                  <Field name={`${name}[${index}].unitOwner`} required={true} label="Unit Owner" type="text" />
                  <Field
                    name={`${name}[${index}].unitBlockStart`}
                    required={true}
                    label={intl.formatMessage({ id: 'unit-block-start' })}
                    type="text"
                  />
                  <Field
                    name={`${name}[${index}].unitBlockEnd`}
                    required={true}
                    label={intl.formatMessage({ id: 'unit-block-end' })}
                    type="text"
                  />
                  <Field
                    name={`${name}[${index}].countryJurisdictionOfOwner`}
                    label={intl.formatMessage({ id: 'country-jurisdiction-of-owner' })}
                    type="picklist"
                    options={picklistOptions?.countries}
                  />
                  <Field
                    name={`${name}[${index}].inCountryJurisdictionOfOwner`}
                    label={intl.formatMessage({ id: 'in-country-jurisdiction-of-owner' })}
                    type="picklist"
                    options={picklistOptions?.countries}
                  />
                </div>
              </>
            )}
          </Repeater>
        </Form>
      )}
    </Formik>
  );
});

export { SplitUnitForm };
