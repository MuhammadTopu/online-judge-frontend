import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const AuthorProblemService = {
  findAll: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/author/problem`, _config);
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

    return await Fetch.get(`/author/problem/${id}`, _config);
  },

  create: async (
    {
      name,
      tags,
      statement,
      time_limit,
      memory_limit,
      input_format,
      output_format,
      note,
      difficulty,

      sample_test_cases_input,
      sample_test_cases_output,
      system_test_cases_input,
      system_test_cases_output,
    }: {
      name?: string;
      tags?: string[];
      statement?: string;
      time_limit?: number;
      memory_limit?: number;
      input_format?: string;
      output_format?: string;
      note?: string;
      difficulty?: string;

      sample_test_cases_input?: string;
      sample_test_cases_output?: string;
      system_test_cases_input?: string;
      system_test_cases_output?: string;
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
      tags: tags,
      statement: statement,
      time_limit: time_limit,
      memory_limit: memory_limit,
      input_format: input_format,
      output_format: output_format,
      note: note,
      difficulty: difficulty,

      sample_test_cases_input: sample_test_cases_input,
      sample_test_cases_output: sample_test_cases_output,
      system_test_cases_input: system_test_cases_input,
      system_test_cases_output: system_test_cases_output,
    };

    return await Fetch.post(`/author/problem`, data, _config);
  },

  update: async (
    id: number,
    {
      name,
      tags,
      statement,
      time_limit,
      memory_limit,
      input_format,
      output_format,
      note,
      difficulty,

      sample_test_cases_input,
      sample_test_cases_output,
      system_test_cases_input,
      system_test_cases_output,
    }: {
      name?: string;
      tags?: string[];
      statement?: string;
      time_limit?: number;
      memory_limit?: number;
      input_format?: string;
      output_format?: string;
      note?: string;
      difficulty?: string;

      sample_test_cases_input?: string;
      sample_test_cases_output?: string;
      system_test_cases_input?: string;
      system_test_cases_output?: string;
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
      tags: tags,
      statement: statement,
      time_limit: time_limit,
      memory_limit: memory_limit,
      input_format: input_format,
      output_format: output_format,
      note: note,
      difficulty: difficulty,

      sample_test_cases_input: sample_test_cases_input,
      sample_test_cases_output: sample_test_cases_output,
      system_test_cases_input: system_test_cases_input,
      system_test_cases_output: system_test_cases_output,
    };

    return await Fetch.patch(`/author/problem/${id}`, data, _config);
  },
};
