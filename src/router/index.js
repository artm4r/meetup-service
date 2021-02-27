import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Главная",
    component: Home
  },
  {
    path: "/meetups",
    name: "Список митапов",
    component: () =>
      import(/* webpackChunkName: "meetups" */ "../views/Meetups")
  },
  {
    path: "/meetups/:id",
    name: "Митап",
    component: () =>
      import(/* webpackChunkName: "meetup-page" */ "../views/MeetupPage"),
    children: [
      {
        path: "description",
        name: "Описание митапа",
        component: () =>
          import(
            /* webpackChunkName: "meetup-description" */ "../components/MeetupDescription"
          )
      },
      {
        path: "agenda",
        name: "Программа митапа",
        component: () =>
          import(
            /* webpackChunkName: "meetup-agenda" */ "../components/MeetupAgenda"
          )
      },
      {
        path: "edit",
        name: "Редактировать митап",
        component: () =>
          import(/* webpackChunkName: "meetup-edit" */ "../views/MeetupEdit")
      }
    ]
  },
  {
    path: "/meetups/create",
    name: "Создание митапа",
    component: () =>
      import(/* webpackChunkName: "meetup-create" */ "../views/MeetupCreate")
  },
  {
    path: "/login",
    name: "Список митапов",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login")
  },
  {
    path: "/register",
    name: "Список митапов",
    component: () =>
      import(/* webpackChunkName: "registration" */ "../views/Registration")
  }
];

const router = new VueRouter({
  routes
});

export default router;
