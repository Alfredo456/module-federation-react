import {Company} from "./company";

export interface Usr {

  name: string;
  username: string;
  email: string;
  roles: string[];
  company: Company[];
  active: boolean;
  firstTime: boolean;
  haveViewerAccess: boolean;
  canCancelStudyToBurn: boolean;
  deleted: boolean;
  canDoReport: boolean;
}
