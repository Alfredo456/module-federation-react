import {PatientMainDicomTags} from "./patient-main-dicom-tags";

export interface Body {

  title: string;
  patientMainDicomTags: PatientMainDicomTags;
  body: string;
  conclusions: string[];
}
