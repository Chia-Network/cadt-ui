import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { ComponentCenteredSpinner, Field, Repeater } from '@/components';
import * as yup from 'yup';
import { RelatedProject } from '@/schemas/RelatedProject.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';
import { useGetProjectOptionsList, useQueryParamState } from '@/hooks';

const validationSchema = yup.object({
  relatedProjects: yup.array().of(
    yup.object({
      relationshipType: yup.string().required('Relationship Type is required'),
      registry: yup.string().required('Registry is required'),
      relatedProjectId: yup.string().required('Related Project ID is required'),
    }),
  ),
});

interface RelatedProjectsFormProps {
  readonly?: boolean;
  data?: RelatedProject[];
}

export interface RelatedProjectsFormRef {
  submitForm: () => Promise<any>;
}

const RelatedProjectsForm = forwardRef<RelatedProjectsFormRef, RelatedProjectsFormProps>(
  ({ readonly = false, data }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);
    const [orgUid] = useQueryParamState('orgUid');

    useImperativeHandle(ref, () => ({
      submitForm: async () =>
        deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'relatedProjects'), [
          'orgUid',
          'warehouseProjectId',
          'timeStaged',
        ]),
    }));

    const { projects: projectOptions, isLoading } = useGetProjectOptionsList(orgUid);

    if (isLoading) {
      return <ComponentCenteredSpinner label="Loading Project Data" />;
    }

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ relatedProjects: data || [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Repeater<RelatedProject>
              name="relatedProjects"
              maxNumber={100}
              minNumber={0}
              readonly={readonly}
              initialValue={data || []}
              itemTemplate={{
                relationshipType: null,
                registry: null,
                relatedProjectId: null,
              }}
            >
              {(relatedProject, index, name) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].relationshipType`}
                    label="Relationship Type"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={relatedProject.relationshipType}
                  />
                  <Field
                    name={`${name}[${index}].registry`}
                    label="Registry"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={relatedProject.registry}
                  />
                  <Field
                    name={`${name}[${index}].relatedProjectId`}
                    label="Related Projects"
                    type="picklist"
                    options={projectOptions}
                    readonly={readonly}
                    required={true}
                    initialValue={relatedProject.relatedProjectId}
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

export { RelatedProjectsForm };
