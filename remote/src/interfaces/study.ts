import {MainDicomTags} from "./main-dicom-tags";
import {PatientMainDicomTags} from "./patient-main-dicom-tags";
import {Report} from "./report";

export interface Study {
  ID: string;
  IsStable: string;
  LastUpdate: string;
  MainDicomTags: MainDicomTags;
  ParentPatient: string;
  PatientMainDicomTags: PatientMainDicomTags;
  Series: string[];
  Type: string;
  Report: Report;
  Burned: boolean;
  ToBurn: boolean;
}
