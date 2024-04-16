import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { RelatedProject } from '@/schemas/RelatedProject.schema';

const validationSchema = yup.object({
  locations: yup.array().of(
    yup.object({
      country: yup.string().required('Country is required'),
      geographicIdentifier: yup.mixed().required('Geographic Identifier is required'),
      inCountryRegion: yup.string(),
      timeStaged: yup.date().nullable(),
      fileId: yup.string(),
    }),
  ),
});

interface RelatedProjectFormFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: RelatedProject[];
}

const RelatedProjectForm: React.FC<RelatedProjectFormFormProps> = ({ readonly = false, data }) => {
  return (
    <Formik
      initialValues={{ locations: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<RelatedProject>
            name="locations"
            maxNumber={100}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            {(relatedProject: RelatedProject) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field
                  name="relationshipType"
                  label="Relationship Type"
                  type="text"
                  readonly={readonly}
                  initialValue={relatedProject.relationshipType}
                />
                <Field
                  name="registry"
                  label="Registry"
                  type="text"
                  readonly={readonly}
                  initialValue={relatedProject.registry}
                />
              </div>
            )}
          </Repeater>
        </Form>
      )}
    </Formik>
  );
};

export { RelatedProjectForm };
