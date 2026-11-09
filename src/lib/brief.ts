import { translate } from "./translations.ts";
import type { Language } from "./translations.ts";
export type Brief = {
  business: string;
  type: string;
  goal: string;
  message: string;
};
export function buildBrief(data: Brief, lang: Language = "es") {
  const t = (value: string) => translate(value, lang);
  return `${t("BRIEF DE PROYECTO WEB")}\n\n${t("Proyecto")}: ${data.business.trim()}\n${t("Tipo de sitio")}: ${t(data.type)}\n${t("Objetivo")}: ${t(data.goal)}\n\n${t("Contexto")}:\n${data.message.trim() || t("Por definir en la primera conversación.")}\n\n${t("Por acordar: audiencia, secciones, contenido, entregables y calendario.")}\n\n${t("Generado con el configurador de DevLaunch, proyecto de portafolio.")}`;
}
