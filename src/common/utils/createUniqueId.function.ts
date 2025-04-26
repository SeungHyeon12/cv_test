import { ulid } from 'ulid';

export function createUniqueId() {
  return ulid();
}
