/* eslint camelcase: 0 */
import cheerio from "cheerio-without-node-native";

import { fetchLines, fetchLine } from "./api";
import { SEMANA, SABADO, DOMINGO } from "./constants/daysOfWeek";

const getText = (node, idx = 0, slice = 0) =>
  node
    .eq(idx)
    .text()
    .slice(slice)
    .trim();

const extractLines = resp => {
  if (resp.status >= 300) return [];

  const html = String(resp._bodyText);
  if (html.indexOf('<tbody id="contentGridSearchLine">') === -1) return [];

  const $ = cheerio.load(html);
  const ret = {};

  $("table > tbody > tr").each((_, tr) => {
    const tds = $("td", tr);
    const cod = parseInt(getText(tds, 0), 10);
    if (tds[1].text !== "")
      ret[cod] = {
        cod,
        nome: getText(tds, 1),
        obs: getText(tds, 3)
      };
  });
  return ret;
};

export const getLines = async () => {
  const responses = await Promise.all([fetchLines(1), fetchLines(3)]);
  return { ...extractLines(responses[0]), ...extractLines(responses[1]) };
};

const extractLine = (resp, updated_at) => {
  const ret = {};

  if (resp.status >= 300) return ret;

  const html = String(resp._bodyText);
  if (html.indexOf('<div class="cabecalho-linha" id="contentInfo">') === -1)
    return ret;

  const $ = cheerio.load(html);

  // detalhes
  const contentInfoDivs = $("#contentInfo > div");

  // retira: "Última atualização:"
  const lastUpdate = getText(contentInfoDivs, 1, 19);
  if (lastUpdate === updated_at) return ret;

  ret.updated_at = lastUpdate;
  // retira: "Tempo de viagem:"
  ret.tempo = getText(contentInfoDivs, 4, 16);
  // retira: "Tarifa:"
  ret.preco = `R$ ${getText(contentInfoDivs, 6, 7)}`;

  // horarios
  ret.data = [];
  // TODO: melhorar essa parte!?
  $("#tabContent1 > div").each((a, div) => {
    const data = {};
    const subDivs1 = $(div).children("div");

    data.saida = subDivs1
      .eq(0)
      .find("> div > strong")
      .text()
      .trim();
    data.weekdays = [];

    subDivs1
      .eq(1)
      .find("> ul > li")
      .each((b, li1) => {
        const subDivs2 = $(li1).children("div");

        let dia = subDivs2
          .eq(0)
          .find("> strong")
          .text()
          .trim();
        if (dia.indexOf("Segunda") > -1) dia = SEMANA;
        else if (dia.indexOf("feriados") > -1) dia = DOMINGO;
        else dia = SABADO;

        data.weekdays[b] = { dia, schedule: [] };

        subDivs2
          .eq(1)
          .find("> ul > li")
          .each((c, li2) => {
            let hora = $(li2)
              .text()
              .trim();
            if (hora) {
              if (hora.startsWith("24:")) hora = hora.replace("24:", "00:");
              data.weekdays[b].schedule.push(hora);
            }
          });
      });

    ret.data.push(data);
  });

  return ret;
};

export const getLine = async (cod, updated_at) => {
  const resp = await fetchLine(cod);
  return extractLine(resp, updated_at);
};
