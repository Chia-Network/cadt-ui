import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { CoBenefit } from '@/schemas/CoBenefit.schema';
import { PickList } from '@/schemas/PickList.schema';
import { validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';

const validationSchema = yup.object({
  cobenefits: yup.array().of(
    yup.object({
      cobenefit: yup.string().required('Co-Benefit is required'),
    }),
  ),
});

interface CoBenefitsFormProps {
  readonly?: boolean;
  data?: CoBenefit[];
  picklistOptions?: PickList;
}

export interface CoBenefitsFormRef {
  submitForm: () => Promise<any>;
}

const CoBenefitsForm = forwardRef<CoBenefitsFormRef, CoBenefitsFormProps>(
  ({ readonly = false, data, picklistOptions }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      submitForm: () => validateAndSubmitFieldArrayForm(formikRef, 'coBenefits'),
    }));

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ coBenefits: data || [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Repeater<CoBenefit>
              name="coBenefits"
              maxNumber={100}
              minNumber={0}
              readonly={readonly}
              initialValue={data || []}
              itemTemplate={{ cobenefit: '' }} // Assuming default template needed
            >
              {(coBenefit, index, name) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].cobenefit`}
                    label="Co-Benefit"
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.coBenefits}
                    readonly={readonly}
                    initialValue={coBenefit.cobenefit}
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

export { CoBenefitsForm };
