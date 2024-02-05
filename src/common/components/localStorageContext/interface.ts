// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ProviderProps<T, A> {
  reducer: (state: T | Record<string, unknown>, action: A) => T
  initialState: T
  storageKey: string
}
