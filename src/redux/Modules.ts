import {epics as userEpics, reducer as user} from './modules/UserModule.ts';

export const reducers = {
  user
};

export const epics = [...userEpics];