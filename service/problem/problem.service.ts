import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ProblemService = {
  findAll: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/problem`, _config);
  },
  findOne: async ({
    id,
    token = "",
    context = null,
  }: {
    id: number;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/problem/${id}`, _config);
  },
  create: async (
    {
      name,
      statement,
      explanation,
      constraint,
      time,
      memory,
      sample_test_cases,
      system_test_cases,
    }: {
      name: string;
      statement: string;
      explanation: string;
      constraint: string;
      time: number;
      memory: number;
      sample_test_cases: string;
      system_test_cases: string;
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
      name: name,
      statement: statement,
      explanation: explanation,
      constraint: constraint,
      time: time,
      memory: memory,
      sample_test_cases: sample_test_cases,
      system_test_cases: system_test_cases,
    };

    return await Fetch.post(`/problem`, data, _config);
  },
};
