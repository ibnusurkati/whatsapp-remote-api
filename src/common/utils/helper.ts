export const isJidUser = (jid: string | undefined): boolean | undefined =>
  jid === null || jid === void 0 ? void 0 : jid.endsWith('@c.us');

export const isJidGroup = (jid: string | undefined): boolean | undefined =>
  jid === null || jid === void 0 ? void 0 : jid.endsWith('@g.us');
