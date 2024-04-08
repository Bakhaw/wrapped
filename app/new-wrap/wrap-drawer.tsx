"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Album } from "@prisma/client";

import { deleteWrap, saveWrap } from "@/app/api/wrap/methods";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "@/components/ui/icons";

import AlbumCardList from "@/components/AlbumCardList";

interface DrawerWrapProps {
  albums: Album[];
  onAdd: (album: Album) => void;
  onRemove: (album: Album) => void;
  wrapId: string | undefined;
  year: string;
}

function WrapDrawer({
  albums,
  onAdd,
  onRemove,
  wrapId,
  year,
}: DrawerWrapProps) {
  const { push } = useRouter();

  const [isSavingWrap, setIsSavingWrap] = useState(false);
  const [isDeletingWrap, setIsDeletingWrap] = useState(false);

  function isAlbumAddedToWrap(selectedAlbumId: string) {
    return Boolean(albums.find((album) => album.id === selectedAlbumId));
  }

  async function handleSaveButtonClick() {
    if (!year) return;

    setIsSavingWrap(true);

    const savedWrap = await saveWrap({
      albums,
      year,
    });

    if (savedWrap.status === 200) {
      push("/");
    }

    setIsSavingWrap(false);
  }

  async function handleDeleteButtonClick() {
    if (!wrapId) return;

    setIsDeletingWrap(true);

    const deletedWrap = await deleteWrap(wrapId);

    if (deletedWrap.status === 200) {
      push("/");
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="uppercase h-12 rounded-full font-bold text-background hover:scale-110 transition-all duration-300">
          your {year} wrap
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="flex flex-col fixed bottom-0 left-0 right-0 max-h-full rounded-t-[10px]">
          <div className="max-w-md w-full mx-auto flex flex-col overflow-auto px-4 mt-4 rounded-t-[10px]">
            <DrawerHeader>
              <DrawerTitle className="uppercase text-center">
                your {year} wrap
              </DrawerTitle>
            </DrawerHeader>

            <div className="p-4">
              {year && (
                <AlbumCardList
                  className="sm:grid-cols-2"
                  albums={albums}
                  isAlbumAddedToWrap={isAlbumAddedToWrap}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </div>

            <DrawerFooter>
              <div className="flex flex-col gap-2">
                <Button
                  className="mt-6 font-bold text-background"
                  disabled={
                    albums.length === 0 || isSavingWrap || isDeletingWrap
                  }
                  onClick={handleSaveButtonClick}
                >
                  {isSavingWrap && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {wrapId ? "Update" : "Create wrap"}
                </Button>
              </div>
              <Button
                className="font-bold"
                disabled={!wrapId || isDeletingWrap || isSavingWrap}
                onClick={handleDeleteButtonClick}
                variant="destructive"
              >
                {isDeletingWrap && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete this wrap
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default WrapDrawer;
