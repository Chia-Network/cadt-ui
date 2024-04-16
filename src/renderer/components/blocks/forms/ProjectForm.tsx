import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Field } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Card } from '@/components';

const validationSchema = yup.object({
  projectName: yup.string(),
});

interface ProjectFormProps {
  onSubmit: () => Promise<any>;
  readonly?: boolean;
  data: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ readonly = false, data }) => {
  return (
    <Formik initialValues={{ apiHost: '', apiKey: '' }} validationSchema={validationSchema} onSubmit={() => {}}>
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
                  type="text"
                  readonly={readonly}
                  initialValue={data.sector}
                />
                <Field
                  name="projectStatus"
                  label="Project Status"
                  type="text"
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
                  type="text"
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
                  type="text"
                  readonly={readonly}
                  initialValue={data.unitMetric}
                />
                <Field
                  name="methodology"
                  label="Methodology"
                  type="text"
                  readonly={readonly}
                  initialValue={data.methodology}
                />
                <Field
                  name="validationBody"
                  label="Validation Body"
                  type="text"
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
