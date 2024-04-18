import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { ProjectLocation } from '@/schemas/ProjectLocation.schema';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  locations: yup.array().of(
    yup.object({
      country: yup.string().required('Country is required'),
      geographicIdentifier: yup.string().required('Geographic Identifier is required'),
      inCountryRegion: yup.string(),
      fileId: yup.string(),
    }),
  ),
});

interface ProjectLocationFormProps {
  readonly?: boolean;
  data?: ProjectLocation[];
  picklistOptions?: PickList;
}

const ProjectLocationForm: React.FC<ProjectLocationFormProps> = ({ readonly = false, data, picklistOptions }) => {
  return (
    <Formik
      initialValues={{ locations: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<ProjectLocation>
            name="locations"
            maxNumber={100}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            {(location: ProjectLocation) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field
                  name="country"
                  label="Host Country"
                  type="picklist"
                  options={picklistOptions?.countries}
                  readonly={readonly}
                  initialValue={location.country}
                />
                <Field
                  name="inCountryRegion"
                  label="In-Country Region"
                  type="text"
                  readonly={readonly}
                  initialValue={location.inCountryRegion}
                />
                <Field
                  name="geographicIdentifier"
                  label="Geographic Identifier"
                  type="text"
                  readonly={readonly}
                  initialValue={location.geographicIdentifier}
                />
                <Field name="fileId" label="File ID" type="text" readonly={readonly} initialValue={location.fileId} />
              </div>
            )}
          </Repeater>
        </Form>
      )}
    </Formik>
  );
};

export { ProjectLocationForm };
