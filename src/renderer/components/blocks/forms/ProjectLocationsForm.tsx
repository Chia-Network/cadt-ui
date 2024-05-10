import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { ProjectLocation } from '@/schemas/ProjectLocation.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';

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

interface ProjectLocationsFormProps {
  readonly?: boolean;
  data?: ProjectLocation[];
  picklistOptions?: PickList;
}

export interface ProjectLocationsFormRef {
  submitForm: () => Promise<any>;
}

const ProjectLocationsForm = forwardRef<ProjectLocationsFormRef, ProjectLocationsFormProps>(
  ({ readonly = false, data, picklistOptions }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      submitForm: async () =>
        deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'projectLocations'), [
          'orgUid',
          'warehouseProjectId',
          'timeStaged',
        ]),
    }));

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ projectLocations: data || [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Repeater<ProjectLocation>
              name="projectLocations"
              maxNumber={100}
              minNumber={0}
              readonly={readonly}
              initialValue={data || []}
              itemTemplate={{
                country: '',
                geographicIdentifier: '',
                inCountryRegion: '',
                fileId: '',
              }}
            >
              {(location, index, name) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].country`}
                    label="Host Country"
                    type="picklist"
                    options={picklistOptions?.countries}
                    readonly={readonly}
                    required={true}
                    initialValue={location.country}
                  />
                  <Field
                    name={`${name}[${index}].inCountryRegion`}
                    label="In-Country Region"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={location.inCountryRegion}
                  />
                  <Field
                    name={`${name}[${index}].geographicIdentifier`}
                    label="Geographic Identifier"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={location.geographicIdentifier}
                  />
                  <Field
                    name={`${name}[${index}].fileId`}
                    label="File ID"
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={location.fileId}
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

export { ProjectLocationsForm };
