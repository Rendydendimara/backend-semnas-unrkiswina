export const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
export const simbolPattern = new RegExp(/[^a-zA-Z0-9 ]/);
export const whiteSpacePatter = new RegExp(/\s/g);
export const numberPattern = new RegExp(/^\d+$/);

/**
 * This Reqex for search uppercase letter
 *
 * true = word have upppercase letter
 * false = word don't have upppercase letter
 */
export const uppercaseLetterPattern = new RegExp(/[A-Z ]/g);

export const imagePattern = new RegExp(/\.(jpe?g|png)$/i);
