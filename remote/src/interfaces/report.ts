import {Body} from "./body";
import {Owner} from "./owner";

export interface Report{

  idStudy: string;
  title: string;
  templateName: string;
  conclusions: string[];
  owner: Owner;
  status: string;
}
