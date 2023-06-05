import { FormControl } from '@angular/forms';
import { List } from 'immutable';
import { REGEX_EMAIL } from './regex-utils';

export const answersValidator = (control: FormControl) => {
  const answers = control.value;
  if (!answers || !List.isList(answers) || (answers as List<number>).count() === 0) {
    return {
      required: true,
    };
  }

  return null;
};

export const noWhitespace = (control: FormControl) => {
  const value: string = control.value;
  if (/\s+/.test(value)) {
    return {
      whitespace: true,
    };
  }

  return null;
};

export const emailFormat = (control: FormControl) => {
  const value: string = control.value;

  if (!(REGEX_EMAIL).test(value)) {
    return {
      emailFormat: true,
    };
  }

  return null;
};

export const eachName = (control: FormControl) => {
  const value: string = control.value;
  const isValid = (/^[A-Za-z\s\d]+$/g).test(value);

  if (!isValid) {
    return {
      eachName: true,
    };
  }

  return null;
};

// todo: not correct! see "eachName" validator!
// see: #ACA-131
export const fullName = (control: FormControl) => {
  const value: string = control.value;
  if (value.split(' ').length !== 2) {
    return {
      fullName: true,
    };
  }

  const [first, last] = value.split(' ');

  if (!(/^[A-Za-z]+$/g).test(first) || !(/^[A-Za-z]+$/g).test(last)) {
    return {
      fullName: true,
    };
  }

  return null;
};

export const onlyLatin = (control: FormControl) => {
  const value: string = control.value;

  if (/^[a-z]+$/i.test(value)) {
    return null;
  }

  return {
    onlyLatin: true,
  };
};
