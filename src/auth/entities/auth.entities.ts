import { user } from '@prisma/client'

export class AuthEntities {
  constructor(options: Partial<user>) {
    Object.assign(this, options)
  }
}
