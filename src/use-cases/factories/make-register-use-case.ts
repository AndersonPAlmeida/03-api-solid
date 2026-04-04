import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../resgister'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserCase = new RegisterUseCase(prismaUsersRepository)

  return registerUserCase
}
