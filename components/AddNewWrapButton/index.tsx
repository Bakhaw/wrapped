import Link from "next/link";
import { CardStackPlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

function AddNewWrapButton({ label }: { label?: string }) {
  return (
    <Link href="/new-wrap">
      <Button className="uppercase font-bold rounded-lg text-foreground text-xs px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br hover:ring-4 hover:ring-amber-300 focus:ring-4 focus:ring-amber-300 focus:scale-95 transition-all duration-150">
        <CardStackPlusIcon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
}

export default AddNewWrapButton;
