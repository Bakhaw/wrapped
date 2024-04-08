import { Prisma } from "@prisma/client";

export type FullWrap = Prisma.WrapGetPayload<{
  include: { albums: true };
}>;

export type FullUser = Prisma.UserGetPayload<{
  include: {
    wrapped: {
      include: {
        albums: true;
      };
    };
  };
}>;
