import * as React from "react";
import { Bot, Frame, Map, PieChart, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Navtitles } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "JackTheJacker",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Navigation",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Home",
          url: "/",
        },
        //add more to add to the list of links link
      ],
    },
    {
      title: "Favourite",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Mystery",
          url: "#",
        },
        {
          title: "Fishery",
          url: "#",
        },
      ],
    },
    {
      title: "All",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
  titles: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Navtitles titles={data.titles} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
