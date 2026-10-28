import { describe, expect, it } from "vitest";
import { buildSearchPages, searchPages } from "./siteSearch";

describe("website search", () => {
  it("finds content on a different website page, case-insensitively", () => {
    const pages = [{ path: "/experience/services", title: "Services", text: "Valet arrival and internal shuttle to Dasman Parking" }];
    expect(searchPages(pages, "DASMAN shuttle").map(page => page.path)).toEqual(["/experience/services"]);
    expect(searchPages(pages, "Dasman nonexistent")).toEqual([]);
  });
  it("searches newly published text instead of the previous wording", () => {
    const pages = [{ path: "/leasing", title: "Leasing", text: "An old outlook" }];
    const previous = { page_prose: [{ page_key: "leasing", field_key: "title", value_en: "An old outlook" }] };
    const current = { page_prose: [{ page_key: "leasing", field_key: "title", value_en: "A newly published outlook" }] };
    const updated = buildSearchPages(pages, previous, current);
    expect(searchPages(updated, "newly published")).toHaveLength(1);
    expect(searchPages(updated, "old outlook")).toHaveLength(0);
  });
  it("does not index content from hidden or admin-only pages", () => {
    const pages = [{ path: "/", title: "Home", text: "Public tower" }];
    const updated = buildSearchPages(pages, {}, { page_prose: [
      { page_key: "experience2", value_en: "Hidden renovation" },
      { page_key: "admin", value_en: "Private information" },
    ] });
    expect(searchPages(updated, "Hidden")).toEqual([]);
    expect(searchPages(updated, "Private")).toEqual([]);
  });
});