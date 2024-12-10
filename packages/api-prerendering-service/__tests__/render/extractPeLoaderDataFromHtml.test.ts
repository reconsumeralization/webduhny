import extractPeLoaderDataFromHtml from "../../src/render/extractPeLoaderDataFromHtml";

describe("extractPeLoaderDataFromHtml Tests", () => {
    it("must detect pe-loader-data-cache tags in given HTML", async () => {
        const results = extractPeLoaderDataFromHtml(TEST_STRING);

        expect(results).toEqual([
            {
                key: "GfT8AoRsYT-1238102521",
                value: [
                    {
                        description:
                            "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
                        id: "5e9d0d95eda69955f709d1eb",
                        name: "Falcon 1",
                        wikipedia: "https://en.wikipedia.org/wiki/Falcon_1"
                    },
                    {
                        description:
                            "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
                        id: "5e9d0d95eda69973a809d1ec",
                        name: "Falcon 9",
                        wikipedia: "https://en.wikipedia.org/wiki/Falcon_9"
                    },
                    {
                        description:
                            "With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.",
                        id: "5e9d0d95eda69974db09d1ed",
                        name: "Falcon Heavy",
                        wikipedia: "https://en.wikipedia.org/wiki/Falcon_Heavy"
                    },
                    {
                        description:
                            "Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle Ã¢ÂÂ composed of the Super Heavy rocket (booster) and Starship (ship) Ã¢ÂÂ will eventually replace Falcon 9, Falcon Heavy and Dragon.",
                        id: "5e9d0d96eda699382d09d1ee",
                        name: "Starship",
                        wikipedia: "https://en.wikipedia.org/wiki/SpaceX_Starship"
                    }
                ]
            }
        ]);
    });
});

const TEST_STRING = `...<li><h1>Starship</h1><div>Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.</div><br><div>More info at&nbsp;<a href="https://en.wikipedia.org/wiki/SpaceX_Starship" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/SpaceX_Starship</a></div></li></ul></pb-spacex></pb-cell></pb-grid></pb-block></pb-document></main><footer data-testid="pb-footer" class="wby-1lh86qf"><div class="wby-xv6w56"><div class="logo wby-1i3ok2b"><a href="/"></a><div class="copy">DEVR © 2024</div></div></div></footer></div></div><pe-loader-data-cache data-key="GfT8AoRsYT-1238102521" data-value="%5B%7B%22description%22%3A%22The%20Falcon%201%20was%20an%20expendable%20launch%20system%20privately%20developed%20and%20manufactured%20by%20SpaceX%20during%202006-2009.%20On%2028%20September%202008%2C%20Falcon%201%20became%20the%20first%20privately-developed%20liquid-fuel%20launch%20vehicle%20to%20go%20into%20orbit%20around%20the%20Earth.%22%2C%22id%22%3A%225e9d0d95eda69955f709d1eb%22%2C%22name%22%3A%22Falcon%201%22%2C%22wikipedia%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFalcon_1%22%7D%2C%7B%22description%22%3A%22Falcon%209%20is%20a%20two-stage%20rocket%20designed%20and%20manufactured%20by%20SpaceX%20for%20the%20reliable%20and%20safe%20transport%20of%20satellites%20and%20the%20Dragon%20spacecraft%20into%20orbit.%22%2C%22id%22%3A%225e9d0d95eda69973a809d1ec%22%2C%22name%22%3A%22Falcon%209%22%2C%22wikipedia%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFalcon_9%22%7D%2C%7B%22description%22%3A%22With%20the%20ability%20to%20lift%20into%20orbit%20over%2054%20metric%20tons%20(119%2C000%20lb)--a%20mass%20equivalent%20to%20a%20737%20jetliner%20loaded%20with%20passengers%2C%20crew%2C%20luggage%20and%20fuel--Falcon%20Heavy%20can%20lift%20more%20than%20twice%20the%20payload%20of%20the%20next%20closest%20operational%20vehicle%2C%20the%20Delta%20IV%20Heavy%2C%20at%20one-third%20the%20cost.%22%2C%22id%22%3A%225e9d0d95eda69974db09d1ed%22%2C%22name%22%3A%22Falcon%20Heavy%22%2C%22wikipedia%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFalcon_Heavy%22%7D%2C%7B%22description%22%3A%22Starship%20and%20Super%20Heavy%20Rocket%20represent%20a%20fully%20reusable%20transportation%20system%20designed%20to%20service%20all%20Earth%20orbit%20needs%20as%20well%20as%20the%20Moon%20and%20Mars.%20This%20two-stage%20vehicle%20%C3%83%C2%A2%C3%82%C2%80%C3%82%C2%94%20composed%20of%20the%20Super%20Heavy%20rocket%20(booster)%20and%20Starship%20(ship)%20%C3%83%C2%A2%C3%82%C2%80%C3%82%C2%94%20will%20eventually%20replace%20Falcon%209%2C%20Falcon%20Heavy%20and%20Dragon.%22%2C%22id%22%3A%225e9d0d96eda699382d09d1ee%22%2C%22name%22%3A%22Starship%22%2C%22wikipedia%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSpaceX_Starship%22%7D%5D"></pe-loader-data-cache></body></html>`;
