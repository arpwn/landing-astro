import test from "node:test";
import assert from "node:assert/strict";
import { buildBrief } from "../src/lib/brief.ts";
test("exports the selected language without translating user content", () => {
  const data = {
    business: "Estudio Norte",
    type: "Portafolio",
    goal: "Mostrar mi trabajo",
    message: "Mi texto original",
  };
  const en = buildBrief(data, "en");
  assert.match(en, /WEBSITE PROJECT BRIEF/);
  assert.match(en, /Website type: Portfolio/);
  assert.match(en, /Mi texto original/);
  assert.match(buildBrief(data, "es"), /Tipo de sitio: Portafolio/);
});
