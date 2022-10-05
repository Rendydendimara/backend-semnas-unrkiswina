import randomstring from 'randomstring';

export const randomString = (length?: number) =>
  randomstring.generate({
    length: length || 8,
    charset: 'alphanumeric',
  });
