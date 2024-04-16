import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { RelatedProject } from '@/schemas/RelatedProject.schema';

const validationSchema = yup.object({
  relatedProjects: yup.array().of(
    yup.object({
      relationshipType: yup.string().required('Relationship Type is required'),
      registry: yup.string().required('Registry is required'),
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
      initialValues={{ relatedProjects: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<RelatedProject>
            name="relatedProjects"
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
