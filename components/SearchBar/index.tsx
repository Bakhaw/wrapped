"use client";

import { FormEvent, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = "Search" }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const defaultValue = searchParams.get("search")?.toString();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    const query = inputRef?.current?.value;

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    inputRef?.current?.blur();

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center w-full rounded-full">
        <div className="flex items-center">
          <IoSearchOutline className="absolute ml-4 w-5 h-5 text-primary" />
        </div>

        <input
          className="w-full py-4 pl-12 pr-4 rounded-full text-primary bg-background border border-primary outline-primary"
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={inputRef}
          type="text"
        />
      </div>
    </form>
  );
}

export default SearchBar;
