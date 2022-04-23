import { Role, User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

interface UserWithRole extends User {
  role: Role
}

export const GetByEmailWithRoleRepository = async (
  email: string
): Promise<Omit<UserWithRole, 'password'>> => {
  const data: UserWithRole = await Prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true
    }
  })

  if (data) {
    const { password, ...user } = data

    return user
  }

  return data
}

export default GetByEmailWithRoleRepository
