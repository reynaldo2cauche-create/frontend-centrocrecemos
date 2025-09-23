import { Button as ButtonMui, styled } from '@mui/material'
import { ThemePalette } from '../theme/theme';
import { motion } from 'framer-motion';

const ColorButton = styled(ButtonMui)(({ backgroundcolorparam }) => {
  return (
    ({
      backgroundColor: backgroundcolorparam,
      '&:hover': {
        // backgroundColor: ThemePalette.PURPLE_LIGHT,
        backgroundColor: backgroundcolorparam,
      },
    })
  )})
;

export const CButton = ({
  variant = 'text',
  onClick = () => {},
  sx={},
  children = null,
  endIcon = null,
  color='info',
  backgroundColor = ThemePalette.PURPLE_LIGHT,
  sxDiv = {},
  type='button',
  isOnHoverMenu = false,
  ...res
}) => {
  return (
    variant === 'contained' ? (
      <motion.div style={sxDiv}>
        <ColorButton variant={variant} onMouseEnter={isOnHoverMenu ? onClick : null} onClick={onClick} sx={sx} endIcon={endIcon} color={color} backgroundcolorparam={backgroundColor} type={type} onMouseLeave={isOnHoverMenu ? onClick : null} {...res}>
          {children}
        </ColorButton>
      </motion.div>
    ) : (
      <motion.div>
        <ButtonMui variant={variant} onMouseEnter={isOnHoverMenu ? onClick : null} onMouseLeave={isOnHoverMenu ? onClick : null} onClick={onClick} sx={sx} endIcon={endIcon} color={color} {...res}>
          {children}
        </ButtonMui>
      </motion.div>
      
    )
  )
}
