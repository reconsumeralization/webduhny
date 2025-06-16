import {
    createFilterOutRecordPlugin,
    FilterOutRecordPlugin
} from "~/sync/plugins/FilterOutRecordPlugin.js";

/**
 * Order keys by what is most like to be filtered out - most inserts/updates/deletes.
 * This is out of my head, so it might not be the best order.
 */
const keys: string[] = [
    // Websockets - on every user login
    "ws#",
    // Migrations - on every deployment
    "migration_run#",
    "migration#",
    // Service Manifest - on deployment if something was changed in the service manifest
    "service_manifest#"
];

export const createDefaultFilterRecordPlugins = (): FilterOutRecordPlugin[] => {
    return [
        createFilterOutRecordPlugin({
            name: FilterOutRecordPlugin.createName("default"),
            filterOut: record => {
                const pk = record.PK.toLowerCase();
                for (const key of keys) {
                    if (pk.startsWith(key)) {
                        console.log("filtering out", JSON.stringify(record));
                        return true;
                    }
                }
                return false;
            }
        })
    ];
};
