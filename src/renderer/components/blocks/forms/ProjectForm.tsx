import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Card, Field } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  projectName: yup.string().required('Project Name is required').min(1, 'Project Name cannot be empty'),
  projectId: yup.string().required('Project ID is required').min(1, 'Project ID cannot be empty'),
  projectDeveloper: yup.string().required('Project Developer is required').min(1, 'Project Developer cannot be empty'),
  program: yup.string().required('Program is required').min(1, 'Program cannot be empty'),
  projectLink: yup
    .string()
    .url('Must be a valid URL')
    .required('Project Link is required')
    .min(1, 'Project Link cannot be empty'),
  sector: yup.string().required('Sector is required').min(1, 'Sector cannot be empty'),
  projectType: yup.string().required('Project Type is required').min(1, 'Project Type cannot be empty'),
  projectStatus: yup.string().required('Project Status is required').min(1, 'Project Status cannot be empty'),
  projectStatusDate: yup.date().required('Project Status Date is required'),
  coveredByNDC: yup.string().required('Covered By NDC is required').min(1, 'Covered By NDC cannot be empty'),
  ndcInformation: yup.string().min(1, 'NDC Information cannot be empty'), // Optional field with no empty string
  currentRegistry: yup.string().min(1, 'Current Registry cannot be empty'), // Optional field with no empty string
  registryOfOrigin: yup
    .string()
    .required('Registry of Origin is required')
    .min(1, 'Registry Of Origin cannot be empty'),
  originProjectId: yup.string().required('Origin Project ID is required').min(1, 'Origin Project ID cannot be empty'),
  unitMetric: yup.string().required('Unit Metric is required').min(1, 'Unit Metric cannot be empty'),
  methodology: yup.string().required('Methodology is required').min(1, 'Methodology cannot be empty'),
  validationBody: yup.string().required('Validation Body is required').min(1, 'Validation Body cannot be empty'),
  validationDate: yup.date().required('Validation Date is required'),
  projectTags: yup.string().min(1, 'Project Tags cannot be empty'), // Optional field with no empty string
});

interface ProjectFormProps {
  readonly?: boolean;
  data?: Project;
  picklistOptions?: PickList;
}

export interface ProjectFormRef {
  submitForm: () => Promise<any>;
}

const defaultProjectData: Project = {
  projectName: '',
  projectId: '',
  projectDeveloper: '',
  program: '',
  projectLink: '',
  sector: '',
  projectType: '',
  projectStatus: '',
  projectStatusDate: new Date(),
  coveredByNDC: '',
  ndcInformation: '',
  currentRegistry: '',
  registryOfOrigin: '',
  originProjectId: '',
  unitMetric: '',
  methodology: '',
  validationBody: '',
  validationDate: new Date(),
  projectTags: '',
};

const getDefaultInitialValues = (data: Partial<Project>): Project => {
  return {
    ...defaultProjectData,
    ...data,
  };
};

const ProjectForm: React.FC<ProjectFormProps> = forwardRef<ProjectFormRef, ProjectFormProps>(
  ({ readonly = false, data = {}, picklistOptions }, ref) => {
    const formikRef = React.useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        if (formikRef.current) {
          const formik = formikRef.current;
          if (formik) {
            const errors = await formik.validateForm(formik.values);
            formik.setTouched(
              Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
            );

            return [errors, formik.values];
          }
        }
      },
    }));

    return (
      <Formik
        innerRef={formikRef}
        initialValues={getDefaultInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-4">
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="projectName"
                    label="Project Name"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.projectName || ''}
                  />
                  <Field
                    name="projectId"
                    label="External Project Id"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.projectId || ''}
                  />
                  <Field
                    name="projectDeveloper"
                    label="Project Developer"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.projectDeveloper || ''}
                  />
                  <Field
                    name="program"
                    label="Program"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.program || ''}
                  />
                </div>
                <div>
                  <Field
                    name="projectLink"
                    label="Project Link"
                    type="link"
                    readonly={readonly}
                    initialValue={data?.projectLink || ''}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="sector"
                    label="Sector"
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.projectSector}
                    readonly={readonly}
                    initialValue={data?.sector || ''}
                  />
                  <Field
                    name="projectType"
                    label="Project Type"
                    freeform={true}
                    type="picklist"
                    options={picklistOptions?.projectType}
                    readonly={readonly}
                    initialValue={data?.projectType || ''}
                  />
                  <Field
                    name="projectStatus"
                    label="Project Status"
                    type="picklist"
                    options={picklistOptions?.projectStatusValues}
                    readonly={readonly}
                    initialValue={data?.projectStatus || ''}
                  />
                  <Field
                    name="projectStatusDate"
                    label="Project Status Date"
                    type="date"
                    readonly={readonly}
                    initialValue={data?.projectStatusDate || ''}
                  />
                </div>
              </Card>
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="coveredByNDC"
                    label="Covered By NDC"
                    type="picklist"
                    options={picklistOptions?.coveredByNDC}
                    readonly={readonly}
                    initialValue={data?.coveredByNDC || ''}
                  />
                  <Field
                    name="ndcInformation"
                    label="NDC Information"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.ndcInformation || ''}
                  />
                  <Field
                    name="currentRegistry"
                    label="Current Registry"
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.registries}
                    readonly={readonly}
                    initialValue={data?.currentRegistry || ''}
                  />
                  <Field
                    name="registryOfOrigin"
                    label="Registry Of Origin"
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.registries}
                    readonly={readonly}
                    initialValue={data?.registryOfOrigin || ''}
                  />
                  <Field
                    name="originProjectId"
                    label="Origin Project ID"
                    type="text"
                    readonly={readonly}
                    initialValue={data?.originProjectId || ''}
                  />
                </div>
              </Card>
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="unitMetric"
                    label="Unit Metric"
                    type="picklist"
                    options={picklistOptions?.unitMetric}
                    readonly={readonly}
                    initialValue={data?.unitMetric || ''}
                  />
                  <Field
                    name="methodology"
                    label="Methodology"
                    type="picklist"
                    freeform={true}
                    options={picklistOptions?.methodology}
                    readonly={readonly}
                    initialValue={data?.methodology || ''}
                  />
                  <Field
                    name="validationBody"
                    label="Validation Body"
                    type="picklist"
                    options={picklistOptions?.validationBody}
                    readonly={readonly}
                    initialValue={data?.validationBody || ''}
                  />
                  <Field
                    name="validationDate"
                    label="Validation Date"
                    type="date"
                    readonly={readonly}
                    initialValue={data?.validationDate || ''}
                  />
                </div>
              </Card>
              <Card>
                <Field
                  name="projectTags"
                  label="Project Tags"
                  type="tag"
                  readonly={readonly}
                  initialValue={data?.projectTags || ''}
                />
              </Card>
            </div>
          </Form>
        )}
      </Formik>
    );
  },
);

export { ProjectForm };
