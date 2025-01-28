import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTableColumns, DataTable, DataTableDefaultData, DataTableSorting } from "./DataTable";
import { Avatar } from "~/Avatar";
import { Text } from "~/Text";

const meta: Meta<typeof DataTable> = {
    title: "Components/DataTable",
    component: DataTable,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story<T extends Record<string, any> & DataTableDefaultData> = StoryObj<typeof DataTable<T>>;

// Declare the data structure.
interface Entry {
    id: string;
    name: string;
    createdBy: string;
    lastModified: string;
    status: string;
    $selectable?: boolean;
}

// Define the columns structure for the table.
const columns: DataTableColumns<Entry> = {
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

// Define the data to display.
function generateEntries(count = 20) {
    const statuses = ["Draft", "Published", "Unpublished"];
    const randomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
    const randomTime = () => {
        const times = ["1 hour ago", "3 hours ago", "1 day ago", "3 days ago", "1 week ago"];
        return times[Math.floor(Math.random() * times.length)];
    };

    const entries = [];
    for (let i = 1; i <= count; i++) {
        entries.push({
            id: `entry-${i}`,
            name: `Entry ${i}`,
            createdBy: "John Doe",
            lastModified: randomTime(),
            status: randomStatus()
        });
    }

    return entries;
}

const data = generateEntries();

export const Default: Story<Entry> = {
    args: {
        data,
        columns
    }
};

export const Bordered: Story<Entry> = {
    args: {
        ...Default.args,
        bordered: true
    }
};

export const WithStickyHeader: Story<Entry> = {
    args: {
        ...Default.args,
        stickyHeader: true
    }
};

export const WithSelectableRows: Story<Entry> = {
    args: Default.args,
    render: args => {
        const [selectedRows, setSelectedRows] = useState<Entry[]>([]);

        return (
            <DataTable
                {...args}
                selectedRows={selectedRows}
                onSelectRow={rows => setSelectedRows(rows)}
            />
        );
    }
};

export const WithLoading: Story<Entry> = {
    args: {
        ...Default.args,
        loading: true
    }
};

export const WithLongColumnContent: Story<Entry> = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                header: "Name - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        },
        data: data.map(entry => ({
            ...entry,
            name: `${entry.name} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        }))
    }
};

export const WithCustomCellRenderer: Story<Entry> = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                cell: (entry: Entry) => {
                    return (
                        <div className={"wby-flex wby-items-center wby-gap-sm-extra"}>
                            <Avatar
                                image={
                                    <Avatar.Image
                                        src="https://github.com/webiny-bot.png"
                                        alt="@webiny"
                                    />
                                }
                                fallback={<Avatar.Fallback>{entry.name.charAt(0)}</Avatar.Fallback>}
                                size={"xl"}
                            />
                            <div>
                                <Text
                                    text={entry.name}
                                    className={"wby-text-neutral-primary wby-font-semibold"}
                                    as={"div"}
                                />
                                <Text
                                    text={`Last updated: ${entry.lastModified}`}
                                    size={"sm"}
                                    className={"wby-text-neutral-strong"}
                                    as={"div"}
                                />
                            </div>
                        </div>
                    );
                }
            }
        }
    }
};

export const WithCustomColumnSize: Story<Entry> = {
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

export const WithCustomColumnClassName: Story<Entry> = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            lastModified: {
                ...columns.lastModified,
                className: "wby-bg-primary-subtle"
            },
            status: {
                ...columns.status,
                className: "wby-text-right"
            }
        }
    }
};

export const WithSorting: Story<Entry> = {
    args: {
        ...Default.args,
        columns: {
            ...columns,
            name: {
                ...columns.name,
                enableSorting: true
            },
            lastModified: {
                ...columns.lastModified,
                enableSorting: true
            }
        },
        sorting: [
            {
                id: "lastModified",
                desc: true
            }
        ]
    },
    render: ({ sorting: argsSorting = [], ...args }) => {
        const [sorting, setSorting] = useState<DataTableSorting>(argsSorting);
        return <DataTable {...args} sorting={sorting} onSortingChange={setSorting} />;
    }
};
