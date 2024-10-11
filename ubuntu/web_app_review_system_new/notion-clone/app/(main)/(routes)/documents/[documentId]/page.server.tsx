import { mockDocuments, Task } from "../mockData";

export async function generateStaticParams() {
  return mockDocuments.map(doc => ({
    documentId: doc.id,
  }));
}

export async function getStaticProps({ params }: { params: { documentId: string } }) {
  const document = mockDocuments.find(doc => doc.id === params.documentId);

  if (!document) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      document,
    },
  };
}

export { default } from './page';
