import { createServerFn } from "@tanstack/react-start";

/** A guest's own Library, worked out on the server (src/lib/guest-library.server.ts), so the browser only gets their shelves. */
export const getGuestLibrary = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./guest-library.server")).guestLibraryData(data));
