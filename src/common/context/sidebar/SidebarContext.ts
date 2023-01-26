import { createContext } from "react";
import { SidebarTypes } from "./SideBarTypes";

export interface SideBarItem {
  name: string;
  icon: string;
  function: Function;
  iconType?: string;
}

export interface Sidebar {
  open: boolean;
  sideBarItems: Array<SideBarItem>;
}
export interface IContext {
  dispatch: ({ type, sidebar }: IAction) => void;
  sidebar: Sidebar;
}

export interface IAction {
  type: SidebarTypes;
  sidebar?: Sidebar;
}

export const SidebarContext = createContext<IContext>({
  dispatch: ({ type, sidebar }: IAction) => {},
  sidebar: {
    open: false,
    sideBarItems: [],
  },
});
