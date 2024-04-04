import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Tab } from 'flowbite-react';
import Field from './Field'; // Adjust import path
import Repeater from './Repeater'; // Adjust import path
import AddressGroup from './AddressGroup'; // Adjust import path
import { useSubmitUserFormMutation } from './userService'; // Adjust import path
import { Button } from 'flowbite-react';

// Define validation schemas for each tab
const userValidationSchema = Yup.object({
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const addressValidationSchema = Yup.array().of(
  Yup.object({
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
  })
).min(1, 'At least one address is required');

// Combine the validation schemas for final form submission validation
const validationSchema = Yup.object({
  ...userValidationSchema.fields,
  addresses: addressValidationSchema,
});

const UserForm = () => {
  const [submitUserForm, { isLoading }] = useSubmitUserFormMutation();
  const [activeTab, setActiveTab] = useState('userInfo');

  const initialValues = {
    userId: '12345',
    firstName: '',
    lastName: '',
    email: '',
    addresses: [{ street: '', city: '', zipCode: '' }],
  };

  const handleSubmit = async (values: any) => {
    try {
      await submitUserForm(values).unwrap();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Function to handle tab changes with validation
  const handleTabChange = async (tab: string, validateForm: any) => {
    const errors = await validateForm();
    // Check for errors in the current active tab's fields before switching
    if (activeTab === 'userInfo' && !errors.firstName && !errors.lastName && !errors.email) {
      setActiveTab(tab);
    } else if (activeTab === 'addresses' && !errors.addresses) {
      setActiveTab(tab);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ validateForm }) => (
        <Form className="space-y-4">
          <Tab.Group>
            <Tab.List>
              <Tab onClick={() => handleTabChange('userInfo', validateForm)}>User Information</Tab>
              <Tab onClick={() => handleTabChange('addresses', validateForm)}>Addresses</Tab>
            </Tab.List>
          </Tab.Group>

          {activeTab === 'userInfo' && (
            <div>
              <Field name="firstName" label="First Name">
                <input className="form-input mt-1 block w-full" placeholder="Enter your first name" />
              </Field>
              <Field name="lastName" label="Last Name">
                <input className="form-input mt-1 block w-full" placeholder="Enter your last name" />
              </Field>
              <Field name="email" label="Email">
                <input className="form-input mt-1 block w-full" placeholder="Enter your email address" />
              </Field>
            </div>
          )}

          {activeTab === 'addresses' && (
            <Repeater name="addresses" maxNumber={3}>
              <AddressGroup />
            </Repeater>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
