import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuth from "@/views/NoAuth.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import WriteQuestionView from "@/views/question/WriteQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "主页",
    component: QuestionView,
  },
  // {
  //   path: "/question",
  //   name: "浏览题目",
  //   component: QuestionView,
  // },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionSubmitView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },

  {
    path: "/write/question/:id",
    name: "在线做题",
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
    component: WriteQuestionView,
  },
  {
    path: "/update/question",
    name: "更新题目",
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
    component: AddQuestionView,
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/about",
  //   name: "管理员可见",
  //   component: () => import("../views/AboutView.vue"),
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuth,
    meta: {
      hideInMenu: true,
    },
  },
];
