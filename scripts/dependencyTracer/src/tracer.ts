import dependencyTree from "dependency-tree";
import path from "path";
import fs from "fs";

function findPathsToTarget(
    tree: dependencyTree.Tree,
    target: string,
    currentPath: string[] = [],
    foundPaths: string[][] = [],
    visited: Set<string> = new Set()
): string[][] {
    for (const [file, deps] of Object.entries(tree)) {
        if (visited.has(file)) {
            continue;
        }
        visited.add(file);

        const newPath = [...currentPath, file];
        if (file.includes(target)) {
            foundPaths.push(newPath);
        } else if (typeof deps === "object" && deps !== null) {
            findPathsToTarget(deps, target, newPath, foundPaths, visited);
        }
    }
    return foundPaths;
}

function main(entryFile: string, targetDependency: string): void {
    if (!fs.existsSync(entryFile)) {
        console.error("Entry file does not exist:", entryFile);
        process.exit(1);
    }

    const cwd = process.cwd();
    const tree = dependencyTree({
        filename: entryFile,
        directory: cwd,
        filter: (p: string) => !p.includes('node_modules'),
        nonExistent: []
    });

    const paths = findPathsToTarget(tree, targetDependency);

    if (paths.length === 0) {
        console.log(`No paths found leading to the target dependency: ${targetDependency}`);
    } else {
        console.log(`Paths to dependency "${targetDependency}":`);
        paths.forEach((p, i) => {
            console.log(`\nPath ${i + 1}:`);
            p.forEach(f => console.log(" ->", f.replace(cwd + path.sep, "")));
        });
    }
}
const [, , entryFile, targetDependency] = process.argv;
if (!entryFile || !targetDependency) {
    console.error("Usage: ts-node traceDependency.ts <entryFile> <targetDependency>");
    process.exit(1);
}
main(path.resolve(entryFile), targetDependency);
