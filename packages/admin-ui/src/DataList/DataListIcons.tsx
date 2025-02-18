import React from "react";
import { ReactComponent as AutoRenew } from "@material-design-icons/svg/outlined/autorenew.svg";
import { ReactComponent as Delete } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as Edit } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as Sort } from "@material-design-icons/svg/outlined/sort.svg";
import { ReactComponent as Filter } from "@material-design-icons/svg/outlined/filter_alt.svg";
import { ReactComponent as NavigateBefore } from "@material-design-icons/svg/outlined/chevron_left.svg";
import { ReactComponent as NavigateAfter } from "@material-design-icons/svg/outlined/chevron_right.svg";
import { ReactComponent as Tune } from "@material-design-icons/svg/outlined/tune.svg";
import { ReactComponent as Download } from "@material-design-icons/svg/outlined/file_download.svg";
import { ReactComponent as Upload } from "@material-design-icons/svg/outlined/file_upload.svg";
import { ReactComponent as ListView } from "@material-design-icons/svg/outlined/list.svg";
import { ReactComponent as Clone } from "@material-design-icons/svg/outlined/library_add.svg";
import { ReactComponent as Login } from "@material-design-icons/svg/outlined/login.svg";
import { IconButton, IconButtonProps } from "~/Button";
import { List } from "~/List";

export const RefreshIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<AutoRenew />} label={"Refresh"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const DeleteIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Delete />} label={"Delete"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const CreateIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Edit />} label={"Create"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const EditIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Edit />} label={"Edit"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const SortIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Sort />} label={"Sort"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const FilterIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Filter />} label={"Filter"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const PreviousPageIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<NavigateBefore />} label={"Previous Page"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const NextPageIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<NavigateAfter />} label={"Next Page"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const OptionsIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Tune />} label={"Options"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const DownloadIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Download />} label={"Download"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const UploadIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Upload />} label={"Upload"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const ListIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<ListView />} label={"List"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const CloneIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Clone />} label={"Clone"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const LoginIcon = (props: IconButtonProps) => {
    return (
        <IconButton
            icon={<List.Item.Icon icon={<Login />} label={"Login"} />}
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};
