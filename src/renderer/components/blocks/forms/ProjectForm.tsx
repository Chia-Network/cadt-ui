import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Field } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Card } from '@/components';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  projectName: yup.string().required('Project Name is required'),
  projectId: yup.string().required('Project ID is required'),
  projectDeveloper: yup.string().required('Project Developer is required'),
  program: yup.string().required('Program is required'),
  projectLink: yup.string().url('Must be a valid URL').required('Project Link is required'),
  sector: yup.string().required('Sector is required'),
  projectType: yup.string().required('Project Type is required'),
  projectStatus: yup.string().required('Project Status is required'),
  projectStatusDate: yup.date().required('Project Status Date is required'),
  coveredByNDC: yup.string().required('Covered By NDC is required'),
  ndcInformation: yup.string(),
  currentRegistry: yup.string(),
  registryOfOrigin: yup.string().required('Registry of Origin is required'),
  originProjectId: yup.string().required('Origin Project ID is required'),
  unitMetric: yup.string().required('Unit Metric is required'),
  methodology: yup.string().required('Methodology is required'),
  validationBody: yup.string().required('Validation Body is required'),
  validationDate: yup.date().required('Validation Date is required'),
  projectTags: yup.string(),
});


interface ProjectFormProps {
  onSubmit: () => Promise<any>;
  readonly?: boolean;
  data: Project;
  picklistOptions: PickList | undefined;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ readonly = false, data, picklistOptions }) => {
  return (
    <Formik initialValues={data} validationSchema={validationSchema} onSubmit={() => {}}>
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
                  initialValue={data.projectName}
                />
                <Field
                  name="projectId"
                  label="External Project Id"
                  type="text"
                  readonly={readonly}
                  initialValue={data.projectId}
                />
                <Field
                  name="projectDeveloper"
                  label="Project Developer"
                  type="text"
                  readonly={readonly}
                  initialValue={data.projectDeveloper}
                />
                <Field name="program" label="Program" type="text" readonly={readonly} initialValue={data.program} />
              </div>
              <div>
                <Field
                  name="projectLink"
                  label="Project Link"
                  type="link"
                  readonly={readonly}
                  initialValue={data.projectLink}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field name="sector" label="Sector" type="text" readonly={readonly} initialValue={data.sector} />
                <Field
                  name="projectType"
                  label="Project Type"
                  type="picklist"
                  options={picklistOptions?.projectType}
                  readonly={readonly}
                  initialValue={data.sector}
                />
                <Field
                  name="projectStatus"
                  label="Project Status"
                  type="picklist"
                  options={picklistOptions?.projectStatusValues}
                  readonly={readonly}
                  initialValue={data.projectStatus}
                />
                <Field
                  name="projectStatusDate"
                  label="Project Status Date"
                  type="date"
                  readonly={readonly}
                  initialValue={data.projectStatusDate}
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
                  initialValue={data.coveredByNDC}
                />
                <Field
                  name="ndcInformation"
                  label="NDC Information"
                  type="text"
                  readonly={readonly}
                  initialValue={data.ndcInformation}
                />
                <Field
                  name="currentRegistry"
                  label="Current Registry"
                  type="text"
                  readonly={readonly}
                  initialValue={data.currentRegistry}
                />
                <Field
                  name="registryOfOrigin"
                  label="Registry Of Origin"
                  type="text"
                  readonly={readonly}
                  initialValue={data.registryOfOrigin}
                />
                <Field
                  name="originProjectId"
                  label="Origin Project ID"
                  type="text"
                  readonly={readonly}
                  initialValue={data.originProjectId}
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
                  initialValue={data.unitMetric}
                />
                <Field
                  name="methodology"
                  label="Methodology"
                  type="picklist"
                  options={picklistOptions?.methodology}
                  readonly={readonly}
                  initialValue={data.methodology}
                />
                <Field
                  name="validationBody"
                  label="Validation Body"
                  type="picklist"
                  options={picklistOptions?.validationBody}
                  readonly={readonly}
                  initialValue={data.validationBody}
                />
                <Field
                  name="validationDate"
                  label="Validation Date"
                  type="date"
                  readonly={readonly}
                  initialValue={data.validationDate}
                />
              </div>
            </Card>
            <Card>
              <Field
                name="projectTags"
                label="Project Tags"
                type="tag"
                readonly={readonly}
                initialValue={data.projectTags}
              />
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ProjectForm };
