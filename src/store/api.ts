import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any | undefined>('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');