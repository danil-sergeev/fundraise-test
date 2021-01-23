import { createContainer, NameAndRegistrationPair } from "awilix";

export const container = createContainer<IDiContainer>({
  injectionMode: "CLASSIC",
});

export type TContainer = typeof container;

export type ScopedContainer = {
  scope: TContainer;
};

export interface IDiContainer {}

export function setupContainer(
  overrideOpts?: NameAndRegistrationPair<IDiContainer>
): void {
  container.register({});
}
