import { createServerFn } from "@tanstack/react-start";
import { auth } from "@/lib/auth/config";
import {
  // getCookie,
  getRequestHeaders,
  // setCookie,
  // deleteCookie,
} from "@tanstack/react-start/server";
// import { USER_DETAILS } from "@/utils/const/cookie-names";
// import { tryCatch } from "@/utils/try-catch";
// import { signJWT, verifyJWT } from "@/utils/jwt";
// import { userDetailsCookieSchema } from "@/utils/zod-schema/cookie-schema";

/**
 * Retrieves the current authenticated session.
 *
 * Reads the incoming request headers and delegates session resolution
 * to the configured authentication provider.
 *
 * @returns {Promise<Awaited<ReturnType<typeof auth.api.getSession>>>}
 * The current session if the user is authenticated; otherwise `null`.
 */
export const fetchSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  return session;
});

/**
 * Retrieves and verifies the user details stored in the client cookie.
 *
 * The cookie is expected to contain a signed JWT. If the cookie is missing,
 * invalid, or fails verification, `null` is returned.
 *
 * The decoded user details or `null` if unavailable or invalid.
 */
// export const fetchUserDetailsCookie = createServerFn().handler(async () => {
//   const cookie = getCookie(USER_DETAILS);

//   if (!cookie) return null;

//   const [err, data] = await tryCatch(verifyJWT(cookie));

//   if (err) return null;

//   const { avatarUrl, email, fullName, phone, role, userId } = data;

//   return {
//     avatarUrl,
//     email,
//     fullName,
//     phone,
//     role,
//     status,
//     userId,
//   };
// });

/**
 * Signs the provided user details as a JWT and stores them
 * in a secure client cookie.
 *
 * The payload is validated against `userDetailsCookieSchema`
 * before being signed and persisted.
 *
 * @param {object} params - Server function arguments.
 * @param {import("zod").infer<typeof userDetailsCookieSchema>} params.data
 * The validated user details to store.
 * @returns {Promise<void>}
 */
// export const setUserDetailsCookie = createServerFn()
//   .validator(userDetailsCookieSchema)
//   .handler(async ({ data }) => {
//     const { avatarUrl, email, fullName, phone, role } = data;
//     const generatedTokenToStoreToClientCookie = await signJWT({
//       avatarUrl,
//       email,
//       fullName,
//       phone,
//       role,
//       userId,
//       age,
//     });

//     setCookie(USER_DETAILS, generatedTokenToStoreToClientCookie);
//   });

/**
 * Removes the user details cookie from the client.
 *
 * This is typically used during logout or when the cached
 * user information should be cleared.
 *
 * @returns {Promise<void>}
 */
// export const deleteUserDetailsCookie = createServerFn().handler(async () => {
//   deleteCookie(USER_DETAILS);
// });
