import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Field, Repeater, UnitSummary } from '@/components';
import { Issuance } from '@/schemas/Issuance.schema';
import { PickList } from '@/schemas/PickList.schema';
import { validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';

const validationSchema = yup.object({
  issuances: yup.array().of(
    yup.object({
      startDate: yup.date().required('Start date is required'),
      endDate: yup
        .date()
        .required('End date is required')
        .min(yup.ref('startDate'), 'End date must be after the start date'),
      verificationApproach: yup.string().required('Verification approach is required'),
      verificationBody: yup.string().required('Verification body is required'),
      verificationReportDate: yup.date().required('Verification report date is required'),
    }),
  ),
});

interface IssuanceFormProps {
  readonly?: boolean;
  data?: Issuance[] | undefined;
  showUnits?: boolean;
  picklistOptions?: PickList | undefined;
}

export interface IssuanceFormRef {
  submitForm: () => Promise<any>;
}

const defaultIssuanceData: Issuance[] = [];

const IssuanceForm = forwardRef<IssuanceFormRef, IssuanceFormProps>(
  ({ readonly = false, data = defaultIssuanceData, showUnits = false, picklistOptions }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      submitForm: () => validateAndSubmitFieldArrayForm(formikRef, 'issuances') 
    }));

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ issuances: data || [] }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <Repeater<Issuance>
              name="issuances"
              maxNumber={100}
              minNumber={0}
              readonly={readonly}
              initialValue={data}
              itemTemplate={{
                startDate: null,
                endDate: null,
                verificationApproach: '',
                verificationBody: '',
                verificationReportDate: null,
              }}
            >
              {(issuance: Issuance, index, name) => (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Field
                      name={`${name}[${index}].startDate`}
                      label="Start Date"
                      type="date"
                      readonly={readonly}
                      initialValue={issuance.startDate}
                    />
                    <Field
                      name={`${name}[${index}].endDate`}
                      label="End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={issuance.endDate}
                    />
                    <Field
                      name={`${name}[${index}].verificationApproach`}
                      label="Verification Approach"
                      type="text"
                      readonly={readonly}
                      initialValue={issuance.verificationApproach}
                    />
                    <Field
                      name={`${name}[${index}].verificationBody`}
                      label="Verification Body"
                      type="picklist"
                      options={picklistOptions?.verificationBody}
                      readonly={readonly}
                      initialValue={issuance.verificationBody || ''}
                    />
                    <Field
                      name={`${name}[${index}].verificationReportDate`}
                      label="Verification Report Date"
                      type="date"
                      readonly={readonly}
                      initialValue={issuance.verificationReportDate || null}
                    />
                  </div>
                  {showUnits && readonly && issuance.id && (
                    <div>
                      <div className="text-xl font-semibold text-gray-800 p-4">Unit Belonging to this Issuance</div>
                      <UnitSummary issuanceId={issuance.id} />
                    </div>
                  )}
                </>
              )}
            </Repeater>
          </Form>
        )}
      </Formik>
    );
  },
);

export { IssuanceForm };
