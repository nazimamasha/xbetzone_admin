import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      // {
      //   heading: "layoutBuilder",
      //   route: "/builder",
      //   keenthemesIcon: "switch",
      //   bootstrapIcon: "bi-layers",
      // },
    ],
  },

  {
    heading: "User & Partner",
    pages: [
      {
        heading: "Users",
        route: "/users",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-users",
      },
      {
        heading: "Partners",
        route: "/agents",
        keenthemesIcon: "briefcase",
        bootstrapIcon: "bi-briefcase",
      },
    ],
  },
  {
    heading: "Deposit & Withdraw",
    pages: [
      {
        heading: "Deposits",
        route: "/deposits",
        keenthemesIcon: "dollar",
        bootstrapIcon: "bi-dollar",
      },
      {
        heading: "Withdraws",
        route: "/withdraws",
        keenthemesIcon: "bill",
        bootstrapIcon: "bi-bill",
      },
    ],
  },
  {
    heading: "Game & Bet",
    pages: [
      {
        sectionTitle: "Games",
        route: "/games",
        keenthemesIcon: "dribbble",
        bootstrapIcon: "bi-dribbble",
        sub: [
          // {
          //   heading: "Prematches",
          //   route: "/games/prematches",
          // },
          // {
          //   heading: "Inplays",
          //   route: "/games/inplays",
          // },
          // {
          //   heading: "ESports",
          //   route: "/games/esports",
          // },
          // {
          //   heading: "ESports (Inplay)",
          //   route: "/games/inplayesports",
          // },
          {
            heading: "Slot",
            route: "/games/slot",
          },
          {
            heading: "Casino",
            route: "/games/casino",
          },
          {
            heading: "Instant",
            route: "/games/instant",
          },
        ],
      },
      {
        sectionTitle: "Bets",
        route: "/bets",
        keenthemesIcon: "medal-star",
        bootstrapIcon: "bi-medal-star",
        sub: [
          // {
          //   heading: "Sports",
          //   route: "/bets/sports",
          // },
          // {
          //   heading: "ESports",
          //   route: "/bets/esports",
          // },
          {
            heading: "Slot",
            route: "/bets/slot",
          },
          {
            heading: "Casino",
            route: "/bets/casino",
          },
          {
            heading: "Instant",
            route: "/bets/instant",
          },
        ],
      },
      {
        heading: "Markets",
        route: "/markets",
        keenthemesIcon: "book-square",
        bootstrapIcon: "bi-book-square",
      },
    ],
  },

  {
    heading: "Stats",
    route: "/stats",
    pages: [
      {
        sectionTitle: "Logs",
        route: "/logs",
        keenthemesIcon: "notepad",
        bootstrapIcon: "bi-notepad",
        sub: [
          {
            heading: "User Balance History",
            route: "/logs/usermoney",
          },
          {
            heading: "Agent Balance Hisotry",
            route: "/logs/agentmoney",
          },
        ],
      },
      {
        heading: "Report",
        route: "/reports",
        keenthemesIcon: "calculator",
        bootstrapIcon: "bi-calculator",
      },
    ],
  },
  // {
  //   heading: "Setting",
  //   route: "/setting",
  //   pages: [
  //     {
  //       heading: "Maintenance",
  //       route: "/setting/maintenace",
  //       keenthemesIcon: "switch",
  //       bootstrapIcon: "bi-layers",
  //     },
  //     {
  //       heading: "Betting",
  //       route: "/setting/betting",
  //       keenthemesIcon: "cup",
  //       bootstrapIcon: "bi-layers",
  //     },
  //     {
  //       heading: "User Level",
  //       route: "/setting/userlevel",
  //       keenthemesIcon: "setting-4",
  //       bootstrapIcon: "bi-layers",
  //     },
  //     {
  //       heading: "Bonus",
  //       route: "/setting/bonus",
  //       keenthemesIcon: "discount",
  //       bootstrapIcon: "bi-discount",
  //     },
  //   ],
  // },
  // {
  //   heading: "craft",
  //   route: "/crafted",
  //   pages: [
  //     {
  //       sectionTitle: "pages",
  //       route: "/pages",
  //       keenthemesIcon: "element-plus",
  //       bootstrapIcon: "bi-archive",
  //       sub: [
  //         {
  //           sectionTitle: "profile",
  //           route: "/profile",
  //           sub: [
  //             {
  //               heading: "profileOverview",
  //               route: "/crafted/pages/profile/overview",
  //             },
  //             {
  //               heading: "projects",
  //               route: "/crafted/pages/profile/projects",
  //             },
  //             {
  //               heading: "campaigns",
  //               route: "/crafted/pages/profile/campaigns",
  //             },
  //             {
  //               heading: "documents",
  //               route: "/crafted/pages/profile/documents",
  //             },
  //             {
  //               heading: "connections",
  //               route: "/crafted/pages/profile/connections",
  //             },
  //             {
  //               heading: "activity",
  //               route: "/crafted/pages/profile/activity",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "wizards",
  //           route: "/wizard",
  //           sub: [
  //             {
  //               heading: "horizontal",
  //               route: "/crafted/pages/wizards/horizontal",
  //             },
  //             {
  //               heading: "vertical",
  //               route: "/crafted/pages/wizards/vertical",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "account",
  //       route: "/account",
  //       keenthemesIcon: "profile-circle",
  //       bootstrapIcon: "bi-person",
  //       sub: [
  //         {
  //           heading: "accountOverview",
  //           route: "/crafted/account/overview",
  //         },
  //         {
  //           heading: "settings",
  //           route: "/crafted/account/settings",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "authentication",
  //       keenthemesIcon: "fingerprint-scanning",
  //       bootstrapIcon: "bi-sticky",
  //       sub: [
  //         {
  //           sectionTitle: "basicFlow",
  //           sub: [
  //             {
  //               heading: "signIn",
  //               route: "/sign-in",
  //             },
  //             {
  //               heading: "signUp",
  //               route: "/sign-up",
  //             },
  //             {
  //               heading: "passwordReset",
  //               route: "/password-reset",
  //             },
  //           ],
  //         },
  //         {
  //           heading: "multiStepSignUp",
  //           route: "/multi-step-sign-up",
  //         },
  //         {
  //           heading: "error404",
  //           route: "/404",
  //         },
  //         {
  //           heading: "error500",
  //           route: "/500",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "modals",
  //       route: "/modals",
  //       keenthemesIcon: "design",
  //       bootstrapIcon: "bi-shield-check",
  //       sub: [
  //         {
  //           sectionTitle: "general",
  //           route: "/general",
  //           sub: [
  //             {
  //               heading: "inviteFriends",
  //               route: "/crafted/modals/general/invite-friends",
  //             },
  //             {
  //               heading: "viewUsers",
  //               route: "/crafted/modals/general/view-user",
  //             },
  //             {
  //               heading: "upgradePlan",
  //               route: "/crafted/modals/general/upgrade-plan",
  //             },
  //             {
  //               heading: "shareAndEarn",
  //               route: "/crafted/modals/general/share-and-earn",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "forms",
  //           route: "/forms",
  //           sub: [
  //             {
  //               heading: "newTarget",
  //               route: "/crafted/modals/forms/new-target",
  //             },
  //             {
  //               heading: "newCard",
  //               route: "/crafted/modals/forms/new-card",
  //             },
  //             {
  //               heading: "newAddress",
  //               route: "/crafted/modals/forms/new-address",
  //             },
  //             {
  //               heading: "createAPIKey",
  //               route: "/crafted/modals/forms/create-api-key",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "wizards",
  //           route: "/wizards",
  //           sub: [
  //             {
  //               heading: "twoFactorAuth",
  //               route: "/crafted/modals/wizards/two-factor-auth",
  //             },
  //             {
  //               heading: "createApp",
  //               route: "/crafted/modals/wizards/create-app",
  //             },
  //             {
  //               heading: "createAccount",
  //               route: "/crafted/modals/wizards/create-account",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "widgets",
  //       route: "/widgets",
  //       keenthemesIcon: "element-7",
  //       bootstrapIcon: "bi-layers",
  //       sub: [
  //         {
  //           heading: "widgetsLists",
  //           route: "/crafted/widgets/lists",
  //         },
  //         {
  //           heading: "widgetsStatistics",
  //           route: "/crafted/widgets/statistics",
  //         },
  //         {
  //           heading: "widgetsCharts",
  //           route: "/crafted/widgets/charts",
  //         },
  //         {
  //           heading: "widgetsMixed",
  //           route: "/crafted/widgets/mixed",
  //         },
  //         {
  //           heading: "widgetsTables",
  //           route: "/crafted/widgets/tables",
  //         },
  //         {
  //           heading: "widgetsFeeds",
  //           route: "/crafted/widgets/feeds",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: "apps",
  //   route: "/apps",
  //   pages: [
  //     {
  //       sectionTitle: "customers",
  //       route: "/customers",
  //       keenthemesIcon: "abstract-38",
  //       bootstrapIcon: "bi-printer",
  //       sub: [
  //         {
  //           heading: "gettingStarted",
  //           route: "/apps/customers/getting-started",
  //         },
  //         {
  //           heading: "customersListing",
  //           route: "/apps/customers/customers-listing",
  //         },
  //         {
  //           heading: "customerDetails",
  //           route: "/apps/customers/customer-details",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "subscriptions",
  //       route: "/subscriptions",
  //       keenthemesIcon: "basket",
  //       bootstrapIcon: "bi-cart",
  //       sub: [
  //         {
  //           heading: "getStarted",
  //           route: "/apps/subscriptions/getting-started",
  //         },
  //         {
  //           heading: "subscriptionList",
  //           route: "/apps/subscriptions/subscription-list",
  //         },
  //         {
  //           heading: "addSubscription",
  //           route: "/apps/subscriptions/add-subscription",
  //         },
  //         {
  //           heading: "viewSubscription",
  //           route: "/apps/subscriptions/view-subscription",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "calendarApp",
  //       route: "/apps/calendar",
  //       keenthemesIcon: "calendar-8",
  //       bootstrapIcon: "bi-calendar3-event",
  //     },
  //     {
  //       sectionTitle: "chat",
  //       route: "/chat",
  //       keenthemesIcon: "message-text-2",
  //       bootstrapIcon: "bi-chat-left",
  //       sub: [
  //         {
  //           heading: "privateChat",
  //           route: "/apps/chat/private-chat",
  //         },
  //         {
  //           heading: "groupChat",
  //           route: "/apps/chat/group-chat",
  //         },
  //         {
  //           heading: "drawerChat",
  //           route: "/apps/chat/drawer-chat",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default MainMenuConfig;
