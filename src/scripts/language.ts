import { translate } from "../lib/translations";
import type { Language } from "../lib/translations";
export function getLanguage(): Language {
  return document.documentElement.lang === "en" ? "en" : "es";
}
export const t = (value: string, parameters: string[] = []) =>
  translate(value, getLanguage(), parameters);
function applyLanguage() {
  const lang = getLanguage();
  const button = document.querySelector<HTMLButtonElement>("#language-toggle");
  if (button) {
    button.textContent = lang === "en" ? "ES" : "EN";
    button.setAttribute(
      "aria-label",
      lang === "en" ? "Cambiar a español" : "Switch to English",
    );
  }
  document.title =
    lang === "en"
      ? "DevLaunch — A clear website for your business"
      : "DevLaunch — Una web clara para tu negocio";
  const description =
    lang === "en"
      ? "DevLaunch: a web studio concept for businesses. Explore the process and create a downloadable brief for your next website."
      : "DevLaunch: concepto de estudio web para negocios. Explora el proceso y prepara un brief descargable para tu siguiente sitio.";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", document.title);
  document
    .querySelector('meta[property="og:locale"]')
    ?.setAttribute("content", lang === "en" ? "en_US" : "es_MX");
  document
    .querySelectorAll<HTMLElement>("[data-aria-key]")
    .forEach((el) => el.setAttribute("aria-label", t(el.dataset.ariaKey!)));
  document
    .querySelectorAll<HTMLElement>("[data-placeholder-key]")
    .forEach((el) =>
      el.setAttribute("placeholder", t(el.dataset.placeholderKey!)),
    );
  document
    .querySelectorAll<HTMLOptionElement>("[data-option-key]")
    .forEach((el) => (el.textContent = t(el.dataset.optionKey!)));
}
applyLanguage();
document.querySelector("#language-toggle")?.addEventListener("click", () => {
  const lang = getLanguage() === "es" ? "en" : "es";
  document.documentElement.lang = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  const url = new URL(location.href);
  if (url.searchParams.has("lang")) {
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  }
  applyLanguage();
  document.dispatchEvent(new Event("app-language-change"));
});
window.addEventListener("storage", (event) => {
  if (event.key === "lang") {
    document.documentElement.lang = event.newValue === "en" ? "en" : "es";
    applyLanguage();
    document.dispatchEvent(new Event("app-language-change"));
  }
});
