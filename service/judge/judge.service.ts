import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const JudgeService = {
  create: async (
    {
      code,
      language,
      problem_id,
    }: {
      code: string;
      language: string;
      problem_id: number;
    },
    context = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      code: code,
      language: language,
      problem_id: problem_id,
    };

    return await Fetch.post(`/judge/submit`, data, _config);
  },
};
