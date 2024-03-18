import SignUpForm from "@/components/Forms/SignUpForm";
import Title from "@/components/Title";

function SignUpPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Title className="text-center">Sign Up</Title>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
