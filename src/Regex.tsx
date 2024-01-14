export const ValidName = new RegExp('^[A-Z]{1,}|\s[a-zA-Z]{2,}$', "i");

export const ValidEmail = new RegExp('^[a-zA-Z]{2,}[0-9]{0,}(@)((gmail\.com)|(hotmail\.com))$');

export const ValidNumber:any = new RegExp('^(010)|(011)|(012)|(015)[0-9]{8}$')

export const ValidPass = new RegExp('^[a-zA-Z]{8,}[0-9]{0,}((@){0,}(%){0,})$')