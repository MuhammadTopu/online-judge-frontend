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
      op,
    }: {
      code: string;
      language: string;
      problem_id: number;
      op: string;
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
    if (op == "run") {
      return await Fetch.post(`/judge/run`, data, _config);
    } else {
      return await Fetch.post(`/judge/submit`, data, _config);
    }
  },
};
