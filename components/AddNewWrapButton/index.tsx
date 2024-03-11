import Link from "next/link";
import { CardStackPlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface AddNewWrapButtonProps {
  year?: string;
}

const currentYear = new Date().getFullYear().toString();

function AddNewWrapButton({ year = currentYear }: AddNewWrapButtonProps) {
  return (
    <Link href={`/new-wrap?year=${year}`}>
      <Button className="uppercase font-bold rounded-lg text-foreground text-xs px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br hover:ring-4 hover:ring-amber-300 focus:ring-4 focus:ring-amber-300 focus:scale-95 transition-all duration-150">
        <CardStackPlusIcon className="mr-2 h-5 w-5" />
        new wrap
      </Button>
    </Link>
  );
}

export default AddNewWrapButton;
