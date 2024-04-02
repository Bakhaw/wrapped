import { Prisma } from "@prisma/client";

export type FullWrap = Prisma.WrapGetPayload<{
  include: { albums: true };
}>;
