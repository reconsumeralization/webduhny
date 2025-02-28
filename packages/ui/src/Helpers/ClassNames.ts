/**
 * This is a pass-through that modifies your object's props and creates the required className prop by merging
 * the provided appendClasses(string) and any class names defined inside your props.
 * To you the function just do: {...getClasses (props)}
 * and make sure you are not spreading the `props` element, as this will clone and spread your current `props` element already.
 *
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please implement your own `getClasses` function or reach out on Slack.
 */
const getClasses = (propList: any, appendClasses: string[] | string) => {
    let classes = "";
    const props = { ...propList };
    if (propList.className) {
        classes = propList.className;
        delete props.className;
    }

    if (appendClasses) {
        classes = `${classes} ${
            Array.isArray(appendClasses) ? appendClasses.join(" ") : appendClasses
        }`.trim();
    }

    props.className = classes;

    return props;
};

export { getClasses };
