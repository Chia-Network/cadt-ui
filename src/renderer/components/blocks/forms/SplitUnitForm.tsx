import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { UnitSplit } from '@/schemas/Unit.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';
import { FormattedMessage, useIntl } from 'react-intl';
import _ from 'lodash';

const validationSchema = yup.object({
  units: yup.array().of(
    yup.object({
      unitBlockStart: yup.string().required('Unit Block Start is required'),
      unitBlockEnd: yup.string().required('Unit Block End is required'),
      unitCount: yup.number().required('Unit count is required'),
      unitOwner: yup.string().nullable(),
      countryJurisdictionOfOwner: yup.string().required('Country jurisdiction of owner is required'),
      inCountryJurisdictionOfOwner: yup.string().required('In-Country jurisdiction of owner is required'),
    }),
  ),
});

interface SplitUnitFormProps {
  picklistOptions?: PickList | null;
  setFormValidationError: (formValid: boolean) => void;
}

export interface SplitUnitFormRef {
  submitForm: () => Promise<any>;
}

const SplitUnitForm = forwardRef<SplitUnitFormRef, SplitUnitFormProps>(
  ({ picklistOptions, setFormValidationError }, ref) => {
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
          <Form onClick={() => setFormValidationError(!_.isEmpty(formikRef?.current?.errors))}>
            <Repeater<UnitSplit>
              name="units"
              maxNumber={5}
              minNumber={3}
              readonly={false}
              initialValue={[
                {
                  unitCount: null,
                  unitOwner: null,
                  unitBlockStart: null,
                  unitBlockEnd: null,
                  countryJurisdictionOfOwner: null,
                  inCountryJurisdictionOfOwner: null,
                },
                {
                  unitCount: null,
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
                  <div>
                    <div className="font-medium pb-6">
                      <FormattedMessage id="new-unit" /> {index + 1}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                      <Field
                        name={`${name}[${index}].unitCount`}
                        required
                        label={intl.formatMessage({ id: 'unit-count' })}
                        type="number"
                      />
                      <Field
                        name={`${name}[${index}].unitOwner`}
                        label={intl.formatMessage({ id: 'unit-owner' })}
                        type="text"
                      />
                      <Field
                        name={`${name}[${index}].unitBlockStart`}
                        required
                        label={intl.formatMessage({ id: 'unit-block-start' })}
                        type="text"
                      />
                      <Field
                        name={`${name}[${index}].unitBlockEnd`}
                        required
                        label={intl.formatMessage({ id: 'unit-block-end' })}
                        type="text"
                      />
                      <Field
                        name={`${name}[${index}].countryJurisdictionOfOwner`}
                        label={intl.formatMessage({ id: 'country-jurisdiction-of-owner' })}
                        required
                        type="picklist"
                        options={picklistOptions?.countries}
                      />
                      <Field
                        name={`${name}[${index}].inCountryJurisdictionOfOwner`}
                        label={intl.formatMessage({ id: 'in-country-jurisdiction-of-owner' })}
                        required
                        type="picklist"
                        options={picklistOptions?.countries}
                      />
                    </div>
                  </div>
                </>
              )}
            </Repeater>
          </Form>
        )}
      </Formik>
    );
  },
);

export { SplitUnitForm };
