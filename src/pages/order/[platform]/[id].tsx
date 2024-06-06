import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const platform = router.query.platform;

  return (
    <>
      {id} <br />
      {platform}
    </>
  );
};
export default Page;
