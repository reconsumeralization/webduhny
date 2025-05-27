type Props = {
    data?: {
        firstName?: string;
        lastName?: string;
    };
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please implement your own `FullName` component or reach out on Slack.
 */
const FullName = (props: Props) => {
    console.warn("The `FullName` component is deprecated and will be removed in future releases.");
    const { data } = props;

    if (!data) {
        return "N/A";
    }

    let output = "";
    if (data.firstName) {
        output += data.firstName;
    }

    if (data.lastName) {
        output += " " + data.lastName;
    }

    return output;
};

export { FullName };
