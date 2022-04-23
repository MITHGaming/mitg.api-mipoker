import { Role, User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

interface UserWithRole extends User {
  role: Role
}

export const CreateUserRepository = async (data: User): Promise<Omit<UserWithRole, 'password'>> => {
  const defaultUserRole = await Prisma.role.findUnique({
    where: {
      name: 'user'
    }
  })

  const result = await Prisma.user.create({
    data: {
      ...data,
      roleId: defaultUserRole.id
    },
    include: {
      role: true
    }
  })

  const { password, ...user } = result

  return user
}

export default CreateUserRepository
