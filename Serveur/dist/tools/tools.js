export function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}
export function protectFromUsername(context, username) {
  if (!context.userInfo) {
    throw new Error("UNAUTHENTICATED : " + context.msg);
  } else if (context.userInfo.username != username) {
    throw new Error("UNAUTHORIZED !");
  }
}
