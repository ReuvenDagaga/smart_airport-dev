import { FC } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface WelcomeCardProps {
  imageSrc: string;
  textButton: string;
  navigateTo: string
}
const WelcomeCard: FC<WelcomeCardProps> = ({
  imageSrc,
  textButton,
  navigateTo
}: WelcomeCardProps): JSX.Element => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(navigateTo)
  }
  return (
    <Box>
      <Card
        sx={{
          width: "400px",
          height: "340px",
          margin: "7px",
          borderRadius: "10px",
          boxShadow: "10px 10px 10px",
          border: "2px solid ",
          overflow: "hidden",
        }}
      >
        <CardActionArea onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="340"
            image={imageSrc}
            alt="green iguana"
          />
          <Button
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "240px",
              color: "#fff",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))", // רקע הדרגתי
              display: "flex", // יישור התוכן בכפתור
              alignItems: "flex-end",
              justifyContent: "flex-start",
              fontSize: "18px",
              border: "none", // ללא גבולות
              zIndex: 1, // מעל האלמנטים האחרים
              transition: "transform 0.3s ease", // אנימציה חלקה לטרנספורמציה
              "&:hover": {
                transform: "translateY(10px)", // הכפתור יעלה ב-10 פיקסלים
              },
            }}
          >
            {textButton}
          </Button>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default WelcomeCard;
