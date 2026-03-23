import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUserCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({ name, email, password_hash })
  }
}
