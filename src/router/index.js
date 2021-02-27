import Vue from "vue";
import VueRouter from "vue-router";
import Meetups from "../views/Meetups";

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  const hasSavedPosition = {
    to: to.matched.some(({ meta }) => meta && meta.saveScrollPosition),
    from: from.matched.some(({ meta }) => meta && meta.saveScrollPosition),
  };

  if (to.hash) {
    return { selector: to.hash };
  } else if (hasSavedPosition.to && hasSavedPosition.from) {
    return false;
  } else {
    return savedPosition || { x: 0, y: 0 };
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Meetups,
  },
  {
    path: "/meetups",
    name: "meetups",
    component: Meetups,
  },
  {
    path: "/meetups/:id(\\d+)",
    name: "meetup",
    component: () =>
      import(/* webpackChunkName: "meetup-page" */ "../views/MeetupPage"),
    children: [
      {
        path: "description",
        name: "meetup-description",
        component: () =>
          import(
            /* webpackChunkName: "meetup-description" */ "../components/MeetupDescription"
          )
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        component: () =>
          import(
            /* webpackChunkName: "meetup-agenda" */ "../components/MeetupAgenda"
          )
      },
      {
        path: "edit",
        name: "edit-meetup",
        component: () =>
          import(/* webpackChunkName: "meetup-edit" */ "../views/MeetupEdit")
      }
    ]
  },
  {
    path: "/meetups/create",
    name: "create-meetup",
    component: () =>
      import(/* webpackChunkName: "meetup-create" */ "../views/MeetupCreate")
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "registration" */ "../views/Registration")
  },
  {
    path: "/*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "registration" */ "../views/Page404")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
});

export default router;
