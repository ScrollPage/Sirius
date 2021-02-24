import { app } from '@/src/features/common';
import { Fetching, createFetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';
import { forward } from "effector";

export const pageMounted = app.createEvent<string>();

const activateProcessing = app.createEffect<string, any, Error>();
export const activateFetching: Fetching<any, Error> = createFetching(activateProcessing, "loading");

activateProcessing.use((token) => accountApi.activate(token));

forward({ from: pageMounted, to: activateProcessing })

activateProcessing.watch((data) => console.log(data))



