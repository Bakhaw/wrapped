import { Suspense } from "react";

import SignInForm from "@/components/Forms/SignInForm";
import Title from "@/components/Title";

function SignInPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 p-12">
      <Title className="text-center">Sign In</Title>

      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}

export default SignInPage;
