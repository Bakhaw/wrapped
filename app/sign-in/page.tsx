import { Suspense } from "react";

import SignInForm from "@/components/Forms/SignInForm";
import Title from "@/components/Title";

function SignInPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Title className="text-center">Sign In</Title>

      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}

export default SignInPage;
