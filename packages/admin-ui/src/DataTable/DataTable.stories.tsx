import React, { useState } from "react";
import type { Meta } from "@storybook/react";
import { Columns, DataTable } from "./DataTable";

const meta: Meta<typeof DataTable> = {
    title: "Components/DataTable",
    component: DataTable,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;

// Declare the data structure.
interface Entry {
    id: string;
    name: string;
    createdBy: string;
    lastModified: string;
    status: string;
    $selectable?: boolean;
}

// Define the columns structure for your table.
const columns: Columns<Entry> = {
    name: {
        header: "Title"
    },
    createdBy: {
        header: "Author"
    },
    lastModified: {
        header: "Last Modified"
    },
    status: {
        header: "Status"
    }
};

// Define the data you want to display.
const data: Entry[] = [
    {
        id: "entry-1",
        name: "Entry 1",
        createdBy: "John Doe",
        lastModified: "3 days ago",
        status: "Draft"
    },
    {
        id: "entry-2",
        name: "Entry 2",
        createdBy: "John Doe",
        lastModified: "1 day ago",
        status: "Published"
    },
    {
        id: "entry-3",
        name: "Entry 3",
        createdBy: "John Doe",
        lastModified: "1 hour ago",
        status: "Published"
    }
];

export const Default = {
    args: {
        data,
        columns
    }
};

export const Bordered = {
    args: {
        ...Default.args,
        bordered: true
    }
};

export const WithSelectableRows = {
    args: {
        ...Default.args,
        isRowSelectable: () => true
    },
    render: args => {
        const [selectedRows, onSelectRow] = useState([]);

        console.log("Selected rows:", selectedRows);

        return <DataTable {...args} selectedRows={selectedRows} onSelectRow={onSelectRow} />;
    }
};

export const WithLoading = {
    args: {
        ...Default.args,
        loadingInitial: true
    }
};

export const WithCustomSize = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                size: 200
            }
        }
    }
};

export const WithSorting = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                enableSorting: true
            }
        }
    }
};

export const WithResizing = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                enableResizing: true
            }
        }
    }
};

export const WithHiding = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                enableHiding: true
            }
        }
    }
};
