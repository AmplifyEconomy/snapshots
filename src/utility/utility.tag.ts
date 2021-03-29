import {Base64UrlEncodedString, WinstonString, fromB64Url} from './utility.encoding';

export interface Tag {
    name: Base64UrlEncodedString;
    value: Base64UrlEncodedString;
}

export function tagValue(tags: Array<Tag>, name: string): string {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (fromB64Url(tag.name).toString().toLowerCase() === name.toLowerCase()) {
      return fromB64Url(tag.value).toString();
    }
  }

  return '';
}
