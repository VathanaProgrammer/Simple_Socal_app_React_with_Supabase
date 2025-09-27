import Layout from "./Layout";
import Message from "./Message";

export default function MessageRes() {
  return (
    <Layout>
      <div className="flex-1 w-full flex flex-col">
        <Message />
      </div>
    </Layout>
  );
}
