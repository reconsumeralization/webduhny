// We only list current version migrations here. No need to have them all
// listed, as we only need the latest version migrations to be executed.
// This also helps with keeping the bundle size down / faster boot times.
import { Flp_5_43_0_001 } from "~/migrations/5.43.0/001/ddb";

export const migrations = () => {
    return [Flp_5_43_0_001];
};
