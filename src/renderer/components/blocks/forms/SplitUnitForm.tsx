import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { UnitSplit } from '@/schemas/Unit.schema';
import { PickList } from '@/schemas/PickList.schema';
import { validateAndSubmitFieldArrayForm, deepOmit } from '@/utils/formik-utils';

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

const SplitUnitForm = forwardRef<SplitUnitFormRef, SplitUnitFormProps>(
  ({ picklistOptions }, ref) => {
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
                    <Field name={`${name}[${index}].unitCount`} label="# of Units" type="number" />
                    <Field name={`${name}[${index}].unitOwner`} label="Unit Owner" type="text" />
                    <Field name={`${name}[${index}].unitBlockStart`} label="Unit Block Start" type="text" />
                    <Field name={`${name}[${index}].unitBlockEnd`} label="Unit Block End" type="text" />
                    <Field
                      name={`${name}[${index}].countryJurisdictionOfOwner`}
                      label="Country Jurisdiction Of Owner"
                      type="picklist"
                      options={picklistOptions?.countries}
                    />
                    <Field
                      name={`${name}[${index}].inCountryJurisdictionOfOwner`}
                      label="In-Country Jurisdiction Of Owner"
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
  },
);

export { SplitUnitForm };
