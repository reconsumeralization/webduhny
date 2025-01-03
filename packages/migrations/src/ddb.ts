// We only list current version migrations here. No need to have them all
// listed, as we only need the latest version migrations to be executed.
// This also helps with keeping the bundle size down / faster boot times.
import { Pages_5_42_0_001 } from "~/migrations/5.42.0/001";

export const migrations = () => {
    return [Pages_5_42_0_001];
};
