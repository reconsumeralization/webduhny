// A fix for CJS resolution.
const path = require("path");
const readJsonSync = require("read-json-sync");
const glob = require("glob");

module.exports.getLexicalAliases = () => {
    // Find location of node_modules where the core "lexical" package is installed.
    const nodeModules = require.resolve("lexical").split("/lexical/")[0];

    // Identify all @lexical/* packages.
    const allLexicalPackages = glob.sync("@lexical/*/package.json", {
        cwd: nodeModules,
        absolute: true
    });

    const lexicalAliases = {
        lexical: require.resolve("lexical")
    };

    // For every package, we want to resolve all of its exports to CJS.
    for (const pkgJsonPath of allLexicalPackages) {
        const pkgJson = readJsonSync(pkgJsonPath);
        const packageDir = pkgJsonPath.replace("/package.json", "");

        Object.keys(pkgJson.exports).forEach(key => {
            const value = path.join(packageDir, pkgJson.exports[key].require.default);

            lexicalAliases[path.join(pkgJson.name, key)] = value;
        });
    }

    return lexicalAliases;
};
