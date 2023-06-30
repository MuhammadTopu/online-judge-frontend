import { cookies } from "next/headers";
import ClientSettingsPage from "./components/ClientSettingsPage";
import { UserService } from "@/service/user/user.service";

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const userService = await UserService.getUserDetails({
      token: token!["value"],
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
export default async function Home() {
  const userData = await getUserData();

  return <ClientSettingsPage userData={userData} />;
}
