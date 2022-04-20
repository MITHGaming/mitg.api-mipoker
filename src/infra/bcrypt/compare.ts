import bcrypt from 'bcrypt'

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash)
  return result
}

export default comparePassword
