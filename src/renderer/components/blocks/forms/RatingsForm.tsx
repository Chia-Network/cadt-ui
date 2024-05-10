import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Rating } from '@/schemas/Rating.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';

const validationSchema = yup.object({
  ratings: yup.array().of(
    yup.object({
      ratingType: yup.string().required('Rating type is required'),
      ratingRangeLowest: yup.string().required('Rating lowest value is required'),
      ratingRangeHighest: yup.string().required('Rating highest value is required'),
      rating: yup.string().required('Rating is required'),
      ratingLink: yup.string().url('Must be a valid URL').nullable(),
    }),
  ),
});

interface RatingsFormProps {
  readonly?: boolean;
  data?: Rating[];
  picklistOptions?: PickList | null;
}

export interface RatingsFormRef {
  submitForm: () => Promise<any>;
}

const RatingsForm = forwardRef<RatingsFormRef, RatingsFormProps>(({ readonly = false, data, picklistOptions }, ref) => {
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    submitForm: async () =>
      deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'projectRatings'), [
        'orgUid',
        'warehouseProjectId',
        'timeStaged',
      ]),
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ projectRatings: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<Rating>
            name="projectRatings"
            maxNumber={100}
            minNumber={0}
            readonly={readonly}
            initialValue={data || []}
            itemTemplate={{
              ratingType: null,
              ratingRangeLowest: null,
              ratingRangeHighest: null,
              rating: null,
              ratingLink: null,
            }}
          >
            {(rating, index, name) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].ratingType`}
                    label="Rating Type"
                    type="picklist"
                    options={picklistOptions?.ratingType}
                    readonly={readonly}
                    required={true}
                    initialValue={rating.ratingType}
                  />
                  <Field
                    name={`${name}[${index}].ratingRangeLowest`}
                    label="Rating Lowest"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={rating.ratingRangeLowest}
                  />
                  <Field
                    name={`${name}[${index}].ratingRangeHighest`}
                    label="Rating Highest"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={rating.ratingRangeHighest}
                  />
                  <Field
                    name={`${name}[${index}].rating`}
                    label="Rating"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={rating.rating}
                  />
                  <Field
                    name={`${name}[${index}].ratingLink`}
                    label="Rating Link"
                    type="link"
                    readonly={readonly}
                    initialValue={rating.ratingLink}
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

export { RatingsForm };
