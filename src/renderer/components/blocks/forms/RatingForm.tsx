import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Rating } from '@/schemas/Rating.schema';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  ratings: yup.array().of(
    yup.object({
      country: yup.string().required('Country is required'),
      geographicIdentifier: yup.mixed().required('Geographic Identifier is required'),
      inCountryRegion: yup.string(),
      timeStaged: yup.date().nullable(),
      fileId: yup.string(),
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
            name="locations"
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
