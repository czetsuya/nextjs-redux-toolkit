import {NextPage} from "next";
import {Container, Link} from "@mui/material";
import Head from 'next/head';
import Footer from "../../components/Footer/Footer";

const Home: NextPage = () => {
  return (
      <Container maxWidth={"md"}>
        <Head>
          <title>Home - NextJS + Redux Toolkit Frontend Framework</title>
        </Head>

        <main>
          <h1>NextJS + Redux Toolkit Project Template</h1>

          <h2>Sample pages</h2>
          <ul>
            <li>
              <Link href="/users">
                <a>Users (CRUD example)</a>
              </Link>
            </li>
          </ul>

          <Footer></Footer>
        </main>
      </Container>
  );
}

export default Home;