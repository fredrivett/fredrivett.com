import React from "react";

import { GetServerSideProps } from "next";
import Link from "next/link";

import { Meta } from "layout/Meta";
import { isAuthedFromCookieHeader } from "lib/words-auth";
import { Main } from "templates/Main";

import Container from "components/Container";

import { WordsEditor } from "../../words/WordsEditor";

const NewWord = () => (
  <Main meta={<Meta title="/words/new" description="Write a new entry" />}>
    <Container maxWidth="md">
      <div className="mb-4">
        <p className="mb-2">
          <Link href="/words">← Words</Link>
        </p>
        <h1 className="fs-1 mb-6">New entry</h1>
        <WordsEditor />
      </div>
    </Container>
  </Main>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const authed = await isAuthedFromCookieHeader(req.headers.cookie);
  if (!authed) {
    return {
      redirect: {
        destination: "/words/login?next=/words/new",
        permanent: false,
      },
    };
  }
  res.setHeader("Cache-Control", "no-store");
  return { props: {} };
};

export default NewWord;
