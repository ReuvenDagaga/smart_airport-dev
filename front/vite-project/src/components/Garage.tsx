import { Box } from '@mui/material'
import backgroundImage from '../assets/garagr.webp'

export default function Garage() {
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
