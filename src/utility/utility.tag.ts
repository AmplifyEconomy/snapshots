import {Base64UrlEncodedString, fromB64Url} from './utility.encoding';

export interface Tag {
    name: Base64UrlEncodedString;
    value: Base64UrlEncodedString;
}

export function tagValue(tags: Array<Tag>, name: string): Base64UrlEncodedString {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (fromB64Url(tag.name).toString().toLowerCase() === name.toLowerCase()) {
      return tag.value;
    }
  }

  return '';
}
