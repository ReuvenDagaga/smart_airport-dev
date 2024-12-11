import { Box } from "@mui/material";
import { FC } from "react";
import WelcomeCard from "./welcomeCard/WelcomeCard";
import backgroundImage from "../../assets/Base.webp";

const DashBoard: FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: "850px" }}>
        <WelcomeCard
          imageSrc="\src\assets\office.webp"
          textButton="Commander Office"
          navigateTo="commander-room"
        />
        <WelcomeCard
          imageSrc="\src\assets\tower.webp"
          textButton="command"
          navigateTo="command-center"
        />
        <WelcomeCard
          imageSrc="\src\assets\fuel.webp"
          textButton="hangar"
          navigateTo="hangar"
        />
        <WelcomeCard
          imageSrc="\src\assets\garagr.webp"
          textButton="garage"
          navigateTo="garage"
        />
      </Box>
    </Box>
  );
};

export default DashBoard;
