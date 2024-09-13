import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限(判断当前用户是否有某个权限)
 * @param loginUser 当前登录用户
 * @param needAccess 所需要的权限
 * @return Boolean 是否有权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  //登录
  if (needAccess === ACCESS_ENUM.USER) {
    //用户没有登录，无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //用户不是管理员
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
