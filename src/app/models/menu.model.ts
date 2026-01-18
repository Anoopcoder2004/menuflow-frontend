export interface Menu {
  id: number;
  menuCode: string;
  menuName: string;
  parentCode: string | null;
  roles: string[];
  showChildren?: boolean; // add this optional property
}
