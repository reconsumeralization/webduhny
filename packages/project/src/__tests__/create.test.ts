import { Project } from "~/Project";
import path from "path";

describe("project root detection", () => {
    it("should be able to detect project root", async () => {
        const project = new Project(
            path.join(__dirname, "mocks", "projectDetection", "a", "b", "c")
        );

        expect(project.paths).toMatchObject({
            dotWebinyFolder: expect.stringMatching(
                /mocks[\\/]+projectDetection[\\/]+webiny\.config\.ts[\\/]+\.webiny$/
            ),
            rootFolder: expect.stringMatching(
                /mocks[\\/]+projectDetection[\\/]+webiny\.config\.ts$/
            )
        });
    });
});
