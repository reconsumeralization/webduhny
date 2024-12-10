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

const TEST_STRING = `...<li><h1>Starship</h1><div>Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.</div><br><div>More info at&nbsp;<a href="https://en.wikipedia.org/wiki/SpaceX_Starship" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/SpaceX_Starship</a></div></li></ul></pb-spacex></pb-cell></pb-grid></pb-block></pb-document></main><footer data-testid="pb-footer" class="wby-1lh86qf"><div class="wby-xv6w56"><div class="logo wby-1i3ok2b"><a href="/"></a><div class="copy">DEVR © 2024</div></div></div></footer></div></div><pe-loader-data-cache data-key="GfT8AoRsYT-1238102521" data-value="W3siZGVzY3JpcHRpb24iOiJUaGUgRmFsY29uIDEgd2FzIGFuIGV4cGVuZGFibGUgbGF1bmNoIHN5c3RlbSBwcml2YXRlbHkgZGV2ZWxvcGVkIGFuZCBtYW51ZmFjdHVyZWQgYnkgU3BhY2VYIGR1cmluZyAyMDA2LTIwMDkuIE9uIDI4IFNlcHRlbWJlciAyMDA4LCBGYWxjb24gMSBiZWNhbWUgdGhlIGZpcnN0IHByaXZhdGVseS1kZXZlbG9wZWQgbGlxdWlkLWZ1ZWwgbGF1bmNoIHZlaGljbGUgdG8gZ28gaW50byBvcmJpdCBhcm91bmQgdGhlIEVhcnRoLiIsImlkIjoiNWU5ZDBkOTVlZGE2OTk1NWY3MDlkMWViIiwibmFtZSI6IkZhbGNvbiAxIiwid2lraXBlZGlhIjoiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmFsY29uXzEifSx7ImRlc2NyaXB0aW9uIjoiRmFsY29uIDkgaXMgYSB0d28tc3RhZ2Ugcm9ja2V0IGRlc2lnbmVkIGFuZCBtYW51ZmFjdHVyZWQgYnkgU3BhY2VYIGZvciB0aGUgcmVsaWFibGUgYW5kIHNhZmUgdHJhbnNwb3J0IG9mIHNhdGVsbGl0ZXMgYW5kIHRoZSBEcmFnb24gc3BhY2VjcmFmdCBpbnRvIG9yYml0LiIsImlkIjoiNWU5ZDBkOTVlZGE2OTk3M2E4MDlkMWVjIiwibmFtZSI6IkZhbGNvbiA5Iiwid2lraXBlZGlhIjoiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmFsY29uXzkifSx7ImRlc2NyaXB0aW9uIjoiV2l0aCB0aGUgYWJpbGl0eSB0byBsaWZ0IGludG8gb3JiaXQgb3ZlciA1NCBtZXRyaWMgdG9ucyAoMTE5LDAwMCBsYiktLWEgbWFzcyBlcXVpdmFsZW50IHRvIGEgNzM3IGpldGxpbmVyIGxvYWRlZCB3aXRoIHBhc3NlbmdlcnMsIGNyZXcsIGx1Z2dhZ2UgYW5kIGZ1ZWwtLUZhbGNvbiBIZWF2eSBjYW4gbGlmdCBtb3JlIHRoYW4gdHdpY2UgdGhlIHBheWxvYWQgb2YgdGhlIG5leHQgY2xvc2VzdCBvcGVyYXRpb25hbCB2ZWhpY2xlLCB0aGUgRGVsdGEgSVYgSGVhdnksIGF0IG9uZS10aGlyZCB0aGUgY29zdC4iLCJpZCI6IjVlOWQwZDk1ZWRhNjk5NzRkYjA5ZDFlZCIsIm5hbWUiOiJGYWxjb24gSGVhdnkiLCJ3aWtpcGVkaWEiOiJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GYWxjb25fSGVhdnkifSx7ImRlc2NyaXB0aW9uIjoiU3RhcnNoaXAgYW5kIFN1cGVyIEhlYXZ5IFJvY2tldCByZXByZXNlbnQgYSBmdWxseSByZXVzYWJsZSB0cmFuc3BvcnRhdGlvbiBzeXN0ZW0gZGVzaWduZWQgdG8gc2VydmljZSBhbGwgRWFydGggb3JiaXQgbmVlZHMgYXMgd2VsbCBhcyB0aGUgTW9vbiBhbmQgTWFycy4gVGhpcyB0d28tc3RhZ2UgdmVoaWNsZSDDosKAwpQgY29tcG9zZWQgb2YgdGhlIFN1cGVyIEhlYXZ5IHJvY2tldCAoYm9vc3RlcikgYW5kIFN0YXJzaGlwIChzaGlwKSDDosKAwpQgd2lsbCBldmVudHVhbGx5IHJlcGxhY2UgRmFsY29uIDksIEZhbGNvbiBIZWF2eSBhbmQgRHJhZ29uLiIsImlkIjoiNWU5ZDBkOTZlZGE2OTkzODJkMDlkMWVlIiwibmFtZSI6IlN0YXJzaGlwIiwid2lraXBlZGlhIjoiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU3BhY2VYX1N0YXJzaGlwIn1d"></pe-loader-data-cache></body></html>`;
