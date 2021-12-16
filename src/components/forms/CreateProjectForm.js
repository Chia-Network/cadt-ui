import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  PrimaryButton,
} from '..';
import { Body, H3 } from '../typography';
import { postNewProject } from '../../store/actions/climateWarehouseActions';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    currentRegistry: '',
    registryOfOrigin: '',
    originProjectId: '',
    program: '',
    projectID: '',
    projectName: '',
    projectLink: '',
    projectDeveloper: '',
    sector: '',
    projectType: '',
    coveredByNDC: 0,
    NDCLinkage: '',
    projectStatus: '',
    projectStatusDate: '',
    unitMetric: '',
    methodology: '',
    methodologyVersion: 0,
    validationApproach: '',
    validationDate: '',
    estimatedAnnualAverageEmissionReduction: 60,
    projectTag: '',
  });

  return (
    <div style={{ width: '320px' }}>
      <H3>Add new project</H3>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Current Registry</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Current Registry"
          state={InputStateEnum.default}
          value={newProject.currentRegistry}
          onChange={value =>
            setNewProject(prev => ({ ...prev, currentRegistry: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Registry of Origin</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Registry of Origin"
          state={InputStateEnum.default}
          value={newProject.registryOfOrigin}
          onChange={value =>
            setNewProject(prev => ({ ...prev, registryOfOrigin: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Origin Project Id</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Origin Project Id"
          state={InputStateEnum.default}
          value={newProject.originProjectId}
          onChange={value =>
            setNewProject(prev => ({ ...prev, originProjectId: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Program</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Program"
          state={InputStateEnum.default}
          value={newProject.program}
          onChange={value =>
            setNewProject(prev => ({ ...prev, program: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project ID</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project ID"
          state={InputStateEnum.default}
          value={newProject.projectID}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectID: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Name</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Name"
          state={InputStateEnum.default}
          value={newProject.projectName}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectName: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Link</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Link"
          state={InputStateEnum.default}
          value={newProject.projectLink}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectLink: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Developer</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Developer"
          state={InputStateEnum.default}
          value={newProject.projectDeveloper}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectDeveloper: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Sector</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Sector"
          state={InputStateEnum.default}
          value={newProject.sector}
          onChange={value =>
            setNewProject(prev => ({ ...prev, sector: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Type</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Type"
          state={InputStateEnum.default}
          value={newProject.projectType}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectType: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Covered by NDC</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Covered by NDC"
          state={InputStateEnum.default}
          value={newProject.coveredByNDC}
          onChange={value =>
            setNewProject(prev => ({ ...prev, coveredByNDC: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>NDC Linkage</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="NDC Linkage"
          state={InputStateEnum.default}
          value={newProject.NDCLinkage}
          onChange={value =>
            setNewProject(prev => ({ ...prev, NDCLinkage: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Status</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Status"
          state={InputStateEnum.default}
          value={newProject.projectStatus}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectStatus: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Status Date</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Status Date"
          state={InputStateEnum.default}
          value={newProject.projectStatusDate}
          onChange={value =>
            setNewProject(prev => ({ ...prev, projectStatusDate: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Metric</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Metric"
          state={InputStateEnum.default}
          value={newProject.unitMetric}
          onChange={value =>
            setNewProject(prev => ({ ...prev, unitMetric: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Methodology</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Methodology"
          state={InputStateEnum.default}
          value={newProject.methodology}
          onChange={value =>
            setNewProject(prev => ({ ...prev, methodology: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Methodology Version</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Methodology Version"
          state={InputStateEnum.default}
          value={newProject.methodologyVersion}
          onChange={value =>
            setNewProject(prev => ({ ...prev, methodologyVersion: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Validation Approach</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Validation Approach"
          state={InputStateEnum.default}
          value={newProject.validationApproach}
          onChange={value =>
            setNewProject(prev => ({ ...prev, validationApproach: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Validation Date</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Validation Date"
          state={InputStateEnum.default}
          value={newProject.validationDate}
          onChange={value =>
            setNewProject(prev => ({ ...prev, validationDate: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>
            Estimated Annual Average Emission Reduction
          </Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Estimated Annual Average Emission Reduction"
          state={InputStateEnum.default}
          value={newProject.estimatedAnnualAverageEmissionReduction}
          onChange={value =>
            setNewProject(prev => ({
              ...prev,
              estimatedAnnualAverageEmissionReduction: value,
            }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Project Tag</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Project Tag"
          state={InputStateEnum.default}
          value={newProject.projectTag}
          onChange={value =>
            setNewProject(prev => ({
              ...prev,
              projectTag: value,
            }))
          }
        />
      </StyledFieldContainer>
      <div onClick={() => dispatch(postNewProject(newProject))}>
        <PrimaryButton label="Submit" size="large" />
      </div>
    </div>
  );
};

export { CreateProjectForm };
