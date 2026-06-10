/**
 * Smoke test to verify Jest + testing infrastructure is configured correctly.
 */
describe("Testing infrastructure", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("jest-dom matchers are available", () => {
    const div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    expect(div).toBeInTheDocument();
    document.body.removeChild(div);
  });

  it("fast-check is available for property-based testing", async () => {
    const fc = await import("fast-check");
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === "number";
      })
    );
  });
});
