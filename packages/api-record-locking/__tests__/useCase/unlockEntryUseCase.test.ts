import { UnlockEntryUseCase } from "~/useCases/UnlockEntryUseCase/UnlockEntryUseCase";
import { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import { WebinyError } from "@webiny/error";
import { createIdentity } from "~tests/helpers/identity";
import { createGetSecurity } from "~tests/mocks/createGetSecurity";

describe("unlock entry use case", () => {
    it("should throw an error on unlocking an entry", async () => {
        expect.assertions(1);

        const useCase = new UnlockEntryUseCase({
            getLockRecordUseCase: {
                execute: async () => {
                    return {
                        lockedBy: createIdentity(),
                        isExpired() {
                            return false;
                        }
                    };
                }
            } as unknown as IGetLockRecordUseCase,
            async getManager() {
                throw new WebinyError("Testing error.", "TESTING_ERROR");
            },
            getIdentity: createIdentity,
            kickOutCurrentUserUseCase: {
                async execute(): Promise<void> {
                    return;
                }
            },
            getSecurity: createGetSecurity(),
            async hasRecordLockingAccess() {
                return true;
            }
        });

        try {
            await useCase.execute({ id: "id", type: "type" });
        } catch (ex) {
            expect(ex).toEqual(
                new WebinyError("Could not unlock entry: Testing error.", "UNLOCK_ENTRY_ERROR")
            );
        }
    });
});
