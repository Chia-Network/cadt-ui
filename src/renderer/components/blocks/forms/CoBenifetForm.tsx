import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { CoBenefit } from '@/schemas/CoBenefit.schema';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  cobenifets: yup.array().of(
    yup.object({
      cobenefit: yup.string().required('Co-Benefit is required'),
    }),
  ),
});

interface CoBenefitFormFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: CoBenefit[];
  picklistOptions?: PickList;
}

const CoBenefitForm: React.FC<CoBenefitFormFormProps> = ({ readonly = false, data, picklistOptions }) => {
  return (
    <Formik
      initialValues={{ cobenifets: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<CoBenefit>
            name="cobenifets"
            maxNumber={100}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            {(coBenefit: CoBenefit) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field
                  name="cobenefit"
                  label="Co-Benefit"
                  type="picklist"
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
};

export { CoBenefitForm };
