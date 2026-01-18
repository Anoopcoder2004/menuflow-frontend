export interface Menu {
  id: number;
  menuCode: string;
  menuName: string;
  parentCode: string | null;
  roles: string[];
}
