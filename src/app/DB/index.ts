import config from '../config'
import { USER_ROLE } from '../modules/Users/user.constant'
import { User } from '../modules/Users/user.model'

const superUser = {
  id: 'SA-0001',
  email: 'mobassherpautex@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLE.super_admin,
  status: 'in-progress',
  isDeleted: false,
  needsPasswordChange: false,
}

const seedSuperAdmin = async () => {
  try {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = await User.findOne({
      role: USER_ROLE.super_admin,
    })

    if (!isSuperAdminExits) {
      await User.create(superUser)
      console.log('Created super admin')
    }
  } catch (error) {
    console.log(error || 'Cannot create super admin')
  }
}

export default seedSuperAdmin
