import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../components/dashboard/DashBoard';
import CommanderComponent from '../components/CommanderComponent';
import Garage from '../components/Garage';
import Hangar from '../components/Hangar';
import CommendComponent from '../components/CommendComponent';

const RoutesHub: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/login" element={<></>} />
      <Route path="/add-soldier" element={<></>} />
      <Route path="/commander-room" element={<CommanderComponent/>} />
      <Route path="/garage" element={<Garage/>} />
      <Route path="/hangar" element={<Hangar/>} />
      <Route path="/command-center" element={<CommendComponent/>} />
    </Routes>
  );
};

export default RoutesHub;
