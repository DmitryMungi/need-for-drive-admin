export interface IMenuItem {
  path: string;
  icon: string;
  name: string;
}

export const MENU_ITEMS: IMenuItem[] = [
  {
    path: "admin/card",
    icon: "assets/sprite/symbol-defs.svg#pan-icon",
    name: "Карточка автомобиля",
  },
  {
    path: "admin/list",
    icon: "assets/sprite/symbol-defs.svg#list-icon",
    name: "Список авто",
  },
  {
    path: "admin/orders",
    icon: "assets/sprite/symbol-defs.svg#order-icon",
    name: "Заказы",
  },
  {
    path: "admin/menu4",
    icon: "assets/sprite/symbol-defs.svg#shape-icon",
    name: "Menu 4",
  },
  {
    path: "admin/menu5",
    icon: "assets/sprite/symbol-defs.svg#table-icon",
    name: "Menu 5",
  },
  {
    path: "admin/menu6",
    icon: "assets/sprite/symbol-defs.svg#person-icon",
    name: "Menu 6",
  },
  {
    path: "admin/menu7",
    icon: "assets/sprite/symbol-defs.svg#error-icon",
    name: " Menu 7",
  },
];
