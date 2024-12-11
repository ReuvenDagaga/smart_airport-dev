interface Soldier {
  id?: number;
  name: string;
  password: string;
  role?: 'commander' | 'technician' | 'controller' | 'armorer';
}

export default Soldier;
