interface Mission {
  id: string;
  description: string;
  priority: 1 | 2 | 3;
  requiredPlanes: number;
  status: 'pending' | 'completed';
}

export default Mission;
