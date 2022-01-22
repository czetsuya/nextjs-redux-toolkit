import Link from "next/link";
import {Box, Container, Typography} from "@mui/material";
import {NextPage} from "next";

const Footer: NextPage = () => {

  return (
      <Container>
        <Box>
          <Typography>
            If you would like to support these tutorials I have a Patreon account
            where you could contribute. It is a service that allows supporters to
            contribute as little as a dollar a month. I would be most grateful for
            any support. Also, if you have suggestions for future topics I would
            love to hear your feedback.
            <br/>
            <br/>
            <Box>
              Patreon:{' '}
              <Link href="https://www.patreon.com/czetsuya">
                <a>https://www.patreon.com/czetsuya</a>
              </Link>
            </Box>
          </Typography>
        </Box>

        <footer>
          <a
              href="https://www.czetsuyatech.com/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Czetsuya Tech
          </a>
        </footer>
      </Container>
  );
}

export default Footer;