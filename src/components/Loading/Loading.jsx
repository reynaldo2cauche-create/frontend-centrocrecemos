import { Box, Typography } from '@mui/material'
import { ThemePalette } from '../../theme/theme'

export const Loading = () => {
  return (
    <Box bgcolor={ThemePalette.PURPLE_HARD} height='100vh' display='flex' alignItems='center' justifyContent='center' flexDirection='column' >
      <img src='/logo-text-short.png' height='131px' width='276px' />
      <Typography component='p' color={ThemePalette.BLACK_MEDIUM}>...Cargando</Typography>
    </Box>
  )
}
