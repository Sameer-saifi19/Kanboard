import { CreditCard, Folder, Settings, UserCircle2Icon, Users2 } from "lucide-react";
import React from "react";

export const menuItems = (slug: string): { title: string; url: string; icon: React.ReactNode }[] => [
  {
    title: "Projects",
    url: `/w/${slug}/projects`,
    icon: <Folder />,
  },
  {
    title: "Members",
    url: `/w/${slug}/members`,
    icon: <Users2 />,
  },
  {
    title: "Settings",
    url: `/w/${slug}/settings`,
    icon: <Settings />,
  },
  {
    title: "Upgrade workspace",
    url: `/w/${slug}/billings`,
    icon: <CreditCard />,
  },
];

export const personalMenuItems = (
  id: string,
): { title: string; url: string; icon: React.ReactNode }[] => [
  {
    title: "Profile and account",
    url: `/u/${id}/profile`,
    icon: <UserCircle2Icon />,
  },
];
