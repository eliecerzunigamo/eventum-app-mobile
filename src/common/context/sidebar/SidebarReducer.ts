import { IAction, Sidebar } from "./SidebarContext";
import { SidebarTypes } from "./SideBarTypes";

export const SidebarReducer = (state: Sidebar, action: IAction) => {
  switch (action.type) {
    case SidebarTypes.SetUserMenu:
      return {
        open: state.open,
        sideBarItems: action.sidebar.sideBarItems,
      };
    case SidebarTypes.SetAdminMenu:
      return {
        open: state.open,
        sideBarItems: action.sidebar.sideBarItems,
      };
    case SidebarTypes.Open:
      return {
        open: true,
        sideBarItems: state.sideBarItems,
      };
    case SidebarTypes.Close:
      return {
        open: false,
        sideBarItems: state.sideBarItems,
      };
    default:
      return {
        ...action.sidebar,
      };
  }
};
