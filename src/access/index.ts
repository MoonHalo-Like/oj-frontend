import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  //获取登录信息
  let loginUser = store.state.user.loginUser;
  //如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  //获取所需权限信息
  const needAccess = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN;
  //跳转的页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没登录，跳转登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
  }
  //如果已登陆，但权限不足
  if (!checkAccess(loginUser, needAccess as string)) {
    next("/noAuth");
    return;
  }
  next();
});
