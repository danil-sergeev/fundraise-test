export abstract class Validator {
  abstract validate<D, S>(data: D, schema: S): Promise<void>;
}
