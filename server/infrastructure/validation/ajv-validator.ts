import { StatusCodes } from "http-status-codes";
import Ajv, { JSONSchemaType } from "ajv";
import { Validator } from "../../core/validation/validator";
import { RestError } from "../errors/rest-error";

export class AjvValidator extends Validator {
  constructor(private readonly ajv: Ajv) {
    super();
  }

  async validate<D, S = JSONSchemaType<D>>(data: D, schema: S): Promise<void> {
    const compiled = this.ajv.compile<D>(schema);
    const result = await compiled(data);

    if (!result) {
      const message = compiled.errors.map((i) => i.message).join("\n");
      throw new RestError(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
  }
}
