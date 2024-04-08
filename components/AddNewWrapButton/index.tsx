import Link from "next/link";
import { CardStackPlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface AddNewWrapButtonProps {
  year?: string;
}

const currentYear = new Date().getFullYear().toString();

const AddNewWrapButton: React.FC<AddNewWrapButtonProps> = ({
  year = currentYear,
}) => (
  <Link href={`/new-wrap?year=${year}`}>
    <Button className="uppercase font-bold rounded-lg text-background text-xs px-5 py-2.5">
      <CardStackPlusIcon className="mr-2 h-5 w-5" />
      new wrap
    </Button>
  </Link>
);

export default AddNewWrapButton;
