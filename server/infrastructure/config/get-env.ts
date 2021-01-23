export function getEnv(key: string): string {
  if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
    throw new Error(`Missing ${key}`);
  }
  return process.env[key];
}
