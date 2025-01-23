/**
 * We want to have stack name as env-variant.
 * If there is no variant sent, just env will be used - this is to maintain backward compatibility.
 */
const getStackName = ({ env, variant }) => {
    return [env, variant].filter(Boolean).join("-");
};

module.exports = {
    getStackName
};
