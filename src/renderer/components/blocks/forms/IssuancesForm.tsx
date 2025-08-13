import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Field, Repeater, IssuancesTable } from '@/components';
import { Issuance } from '@/schemas/Issuance.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';
import { useIntl } from 'react-intl';

const validationSchema = yup.object({
  issuances: yup.array().of(
    yup.object({
      startDate: yup.date().required('Start date is required'),
      endDate: yup
        .date()
        .required('End date is required')
        .min(yup.ref('startDate'), 'End date must be after the start date'),
      verificationApproach: yup.string().required('Verification approach is required'),
      verificationBody: yup.string(),
      verificationReportDate: yup.date().required('Verification report date is required'),
    }),
  ),
});

interface IssuancesFormProps {
  readonly?: boolean;
  data?: Issuance[] | undefined;
  showUnits?: boolean;
  picklistOptions?: PickList | undefined;
}

export interface IssuancesFormRef {
  submitForm: () => Promise<any>;
}

const defaultIssuanceData: Issuance[] = [];

const IssuancesForm = forwardRef<IssuancesFormRef, IssuancesFormProps>(
  ({ readonly = false, data = defaultIssuanceData, picklistOptions }, ref) => {
    const intl = useIntl();
    const formikRef = useRef<FormikProps<any>>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useImperativeHandle(ref, () => ({
      submitForm: async () =>
        deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'issuances'), [
          'orgUid',
          'warehouseProjectId',
          'timeStaged',
        ]),
    }));

    const handlePageChange = useCallback(
      (page) => {
        setCurrentPage(page);
      },
      [setCurrentPage],
    );

    // Calculate pagination for issuances (only show pagination if more than 50 items)
    const itemsPerPage = 50;
    const totalIssuances = data?.length || 0;
    const totalPages = Math.ceil(totalIssuances / itemsPerPage);
    const shouldShowPagination = totalIssuances > itemsPerPage;

    // Get current page data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data?.slice(startIndex, endIndex) || [];

    // If readonly mode, show table view
    if (readonly) {
      return (
        <IssuancesTable
          data={currentPageData}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={shouldShowPagination ? totalPages : 1}
          totalCount={totalIssuances}
        />
      );
    }

    // If not readonly, show the original form view for editing
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].startDate`}
                    label={intl.formatMessage({ id: 'start-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={issuance.startDate}
                  />
                  <Field
                    name={`${name}[${index}].endDate`}
                    label={intl.formatMessage({ id: 'end-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={issuance.endDate}
                  />
                  <Field
                    name={`${name}[${index}].verificationApproach`}
                    label={intl.formatMessage({ id: 'verification-approach' })}
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={issuance.verificationApproach}
                  />
                  <Field
                    name={`${name}[${index}].verificationBody`}
                    label={intl.formatMessage({ id: 'verification-body' })}
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.verificationBody}
                    readonly={readonly}
                    initialValue={issuance.verificationBody || ''}
                  />
                  <Field
                    name={`${name}[${index}].verificationReportDate`}
                    label={intl.formatMessage({ id: 'verification-report-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={issuance.verificationReportDate || null}
                  />
                </div>
              )}
            </Repeater>
          </Form>
        )}
      </Formik>
    );
  },
);

export { IssuancesForm };
