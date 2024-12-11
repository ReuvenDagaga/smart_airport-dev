import { Box } from '@mui/material'
import backgroundImage from '../assets/office.webp'
export default function CommanderComponent() {
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
    </Box>
  )
}
