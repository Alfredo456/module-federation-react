import {Report} from "./report";
import {Unit} from "./unit";
import {Location} from "./location";
import {Contract} from "./contract";

export interface Company{
   name: string;
   rif: string;
   reports: Report[];
   units: Unit[];
   locations: Location[];
   contracts: Contract[]
}
