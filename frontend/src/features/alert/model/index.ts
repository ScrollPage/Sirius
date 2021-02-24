import { app } from '@/src/features/common';

type Kind = 'success' | 'warning' | 'error'

interface CallType {
  kind: Kind,
  label: string;
}

export const alertCalled = app.createEvent<CallType>();
export const alertClosed = app.createEvent();

const $alert = app.createStore<CallType>({
  kind: null,
  label: null
});

export const $alertKind = $alert.map(({ kind }) => kind);
export const $alertLabel = $alert.map(({ label }) => label);

$alert
  .on(alertCalled, (_, data) => data)
  .reset(alertClosed)
