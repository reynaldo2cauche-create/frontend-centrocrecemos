import { Grid, styled } from "@mui/material";

export const GridInfoLogoFooter = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left'
  }
}));

export const GridInfoDetailFooter = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '0px',
    textAlign: 'center',
  },
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '100px',
    textAlign: 'left'
  }
}));

export const GridInfoSocialFooter = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-end'
  }
}));