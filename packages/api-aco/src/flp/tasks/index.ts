import { createFlpTask } from "~/flp/tasks/createFlp.task";
import { updateFlpTask } from "~/flp/tasks/updateFlp.task";
import { deleteFlpTask } from "~/flp/tasks/deleteFlp.task";

export const CREATE_FLP_TASK_ID = "acoCreateFlp";
export const DELETE_FLP_TASK_ID = "acoDeleteFlp";
export const UPDATE_FLP_TASK_ID = "acoUpdateFlp";

export const flpTasks = () => {
    return [createFlpTask(), updateFlpTask(), deleteFlpTask()];
};
