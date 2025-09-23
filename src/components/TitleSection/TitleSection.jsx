import { Box, Divider, Typography } from '@mui/material'
import { TypeTitleSection } from '../../constants/TitleSection.constant';
import { FontSize, ThemePalette } from '../../theme/theme';

export const TitleSection = ({
  classname = TypeTitleSection.PURPLE,
  title='Título'
}) => {

  const objClassnameColor = (value) => {
    let colorTitle, bgColorDivider = ''
    switch (value) {
      case TypeTitleSection.PURPLE:
        colorTitle = ThemePalette.WHITE;
        bgColorDivider = ThemePalette.WHITE;
        break;
      case TypeTitleSection.WHITE:
        colorTitle = ThemePalette.PURPLE_LIGHT;
        bgColorDivider = ThemePalette.PURPLE_LIGHT;
        break;
      default:
        colorTitle = ThemePalette.WHITE;
        bgColorDivider = ThemePalette.WHITE;
        break;
    }
    return {
      colorTitle,
      bgColorDivider
    }
  }

  return (
    <Box>
      <Typography 
        component='h2' 
        fontSize={FontSize.TITLE_SECTION} 
        color={objClassnameColor(classname)?.colorTitle} 
        fontWeight='bold'
        textAlign='center'
      >
        {title}
      </Typography>
      <Divider sx={{ backgroundColor: objClassnameColor(classname)?.bgColorDivider, width: '150px', margin: 'auto' }} />
    </Box>
  )
}
