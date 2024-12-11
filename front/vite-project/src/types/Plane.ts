interface Plane {
  id: string;
  type: string;
  nickName: string;
  isArmed: boolean;
  isFueled: boolean;
  wingsStatus: boolean;
  engineStatus: boolean;
  wheelStatus: boolean;
  locationStatus: 'controlTower' | 'hangar' | 'armory' | 'inAir';
}

export default Plane;
