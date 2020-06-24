import { ulid } from 'ulid'

export function createClassname(): string {
  return 'userstyle-' + ulid().toLowerCase()
}
