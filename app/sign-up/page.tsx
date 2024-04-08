import SignUpForm from "@/components/Forms/SignUpForm";
import Title from "@/components/Title";

function SignUpPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 p-12">
      <Title className="text-center">Sign Up</Title>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
