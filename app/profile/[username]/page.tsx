import { UserService } from "@/service/user/user.service";
import { cookies } from "next/headers";
import ClientProfilePage from "./components/ClientProfilePage";

async function getUserData(username: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const userService = await UserService.findOneByUsername({
      username: username,
      token: token && token!["value"],
    });

    const responseUser = userService.data.data;

    return responseUser;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export default async function Home({
  params,
}: {
  params: { username: string };
}) {
  const userData = await getUserData(params.username);

  return <ClientProfilePage userData={userData} />;
}
