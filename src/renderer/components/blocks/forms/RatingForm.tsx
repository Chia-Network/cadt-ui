import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Rating } from '@/schemas/Rating.schema';
import { PickList } from '@/schemas/PickList.schema';

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

interface RatingFormFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: Rating[];
  picklistOptions: PickList | undefined | null;
}

const RatingForm: React.FC<RatingFormFormProps> = ({ readonly = false, data, picklistOptions }) => {
  return (
    <Formik
      initialValues={{ ratings: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<Rating>
            name="ratings"
            maxNumber={100}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            {(rating: Rating) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="ratingType"
                    label="Rating Type"
                    type="picklist"
                    options={picklistOptions?.ratingType}
                    readonly={readonly}
                    initialValue={rating.ratingType}
                  />
                  <Field
                    name="ratingLowest"
                    label="Rating Lowest"
                    type="text"
                    readonly={readonly}
                    initialValue={rating.ratingRangeLowest}
                  />

                  <Field
                    name="ratingHighest"
                    label="Rating Highest"
                    type="text"
                    readonly={readonly}
                    initialValue={rating.ratingRangeHighest}
                  />
                  <Field name="rating" label="Rating" type="text" readonly={readonly} initialValue={rating.rating} />
                </div>
                <div>
                  <Field
                    name="rating"
                    label="Rating"
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
};

export { RatingForm };
