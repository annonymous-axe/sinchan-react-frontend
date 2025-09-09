import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: 3,
        mt: 'auto'
      }}
    >
      <Typography variant="caption">
        &copy; All rights reserved{' '}
        <Typography component={Link} href="" underline="hover" target="_blank" color="secondary.main">
          Nextech
        </Typography>
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <Link
          component={RouterLink}
          to="https://www.linkedin.com/in/kamlesh-baviskar"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          <LinkedInIcon />
        </Link>
        <Link
          component={RouterLink}
          to="https://github.com/annonymous-axe"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          <GitHubIcon />
        </Link> */}
      </Stack>
    </Stack>
  );
}
