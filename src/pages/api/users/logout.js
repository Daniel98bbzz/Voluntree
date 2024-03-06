export default async function POST(request, result) {
  try {
    result.setHeader("Set-Cookie", `jwtSession=; Path=/; HttpOnly; Max-Age=0`);

    return result.status(200).json({ message: "Logged In" });
  } catch (error) {
    return result.status(500).json({ error: error.message });
  }
}
