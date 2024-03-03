import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {
  createdProgramsReducer,
  createProgramReducer,
  updateProgramReducer,
  deleteProgramReducer,
  inviteResearchersReducer,
  getResearchersReducer,
  createdScansReducer,
} from "./customerReducer";
import {
  publicProgramsReducer,
  invitedProgramsReducer,
  submittedProgramsReducer,
  enrolledProgramsReducer,
} from "./researcherReducer";
import {
  programsAprroveReducer,
  submissionsAprroveReducer,
  researchersReducer,
  customersReducer,
} from "./adminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  createdPrograms: createdProgramsReducer,
  createProgram: createProgramReducer,
  updateProgram: updateProgramReducer,
  deleteProgram: deleteProgramReducer,
  inviteResearchers: inviteResearchersReducer,
  getResearchers: getResearchersReducer,
  publicPrograms: publicProgramsReducer,
  invitedPrograms: invitedProgramsReducer,
  enrolledPrograms: enrolledProgramsReducer,
  submittedPrograms: submittedProgramsReducer,
  programsApproval: programsAprroveReducer,
  submissionsApproval: submissionsAprroveReducer,
  allResearchers: researchersReducer,
  allCustomers: customersReducer,
  createdScans: createdScansReducer,
});

export default rootReducer;
