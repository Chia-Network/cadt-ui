import { Label } from './Label.schema';
import { Issuance } from './Issuance.schema';
import { CoBenefit } from './CoBenefit.schema';
import { RelatedProject } from './RelatedProject.schema';
import { ProjectLocation } from './ProjectLocation.schema';
import { Rating } from './Rating.schema';
import { Estimation } from './Estimation.schema';

export interface Project {
  // Required properties
  warehouseProjectId?: string; // Derived upon creation
  orgUid?: string; // Derived upon creation
  projectId: string | number;
  originProjectId: string | number;
  registryOfOrigin: string;
  projectName: string;
  projectLink: string;
  projectDeveloper: string;
  sector: string;
  projectType: string;
  coveredByNDC: string;
  projectStatus: string;
  projectStatusDate: Date | null;
  unitMetric: string;
  methodology: string;

  // Optional properties
  currentRegistry?: string | null;
  program?: string | null;
  projectTags?: string | null;
  ndcInformation?: string | null;
  methodology2?: string | null;
  validationBody?: string | null;
  validationDate?: Date | null;
  description?: string | null;
  labels?: Label[];
  issuances?: Issuance[];
  coBenefits?: CoBenefit[];
  relatedProjects?: RelatedProject[];
  projectLocations?: ProjectLocation[];
  projectRatings?: Rating[];
  estimations?: Estimation[];
  updatedAt?: Date | null;
  createdAt?: Date | null;
  timeStaged?: Date | null;
}
