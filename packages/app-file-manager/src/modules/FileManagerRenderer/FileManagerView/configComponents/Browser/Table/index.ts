import { Column, ColumnConfig } from "./Column";
import { Thumbnail, ThumbnailConfig } from "./Thumbnail";

export interface TableConfig {
    columns: ColumnConfig[];
    cellThumbnails: ThumbnailConfig[];
}

export const Table = {
    Column,
    Cell: {
        Thumbnail
    }
};
