import { app } from '@/src/features/common';

type Kind = 'logout';

interface ModalType {
  kind: Kind;
  props: any;
}

export const modalOpened = app.createEvent<ModalType>()
export const modalClosed = app.createEvent<void>()

export const $modal = app.createStore<ModalType>({ kind: null, props: null })
export const $modalKind = $modal.map(({ kind }) => kind)
export const $modalProps = $modal.map(({ props }) => props)

$modal
  .on(modalOpened, (_, data) => data)
  .reset(modalClosed)