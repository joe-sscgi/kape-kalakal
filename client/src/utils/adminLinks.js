import React from "react";

const links = [
  {
    text: "Management",
    children: [
      {
        text: "Content Management",
        path: "set-content",
      },
      {
        text: "Orders Management",
        path: "manage-orders",
      },
    ],
  },
  {
    text: "Maintenance",
    path: "maintenance",
  },
  {
    text: "Utilities",
    path: "utilities",
  },
  {
    text: "Profile",
    path: "profile",
  },
];

export default links;
