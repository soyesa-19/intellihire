import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return user?.role === "admin" ? (
    <InterviewForm userId={user?.id!} />
  ) : (
    <h3 className="text-center mt-10 text-xl">Not authorised</h3>
  );
};

export default Page;
