import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  console.log(router);

  return <>test</>;
};
export default Page;
