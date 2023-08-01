import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const AuthorContestService = {
  findAll: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/author/contest`, _config);
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

    return await Fetch.get(`/author/contest/${id}`, _config);
  },

  create: async (
    {
      name,
      slug,
      start_at,
      end_at,
      participant_type,
    }: {
      name: string;
      slug: string;
      start_at: string;
      end_at: string;
      participant_type: string;
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
      name,
      slug,
      start_at,
      end_at,
      participant_type,
    };

    return await Fetch.post(`/author/contest`, data, _config);
  },

  update: async (
    id: number,
    {
      name,
      slug,
      description,
      start_at,
      end_at,
      contest_visibility,
      password,
      participant_type,
    }: {
      name: string;
      slug: string;
      description: string;
      start_at: string;
      end_at: string;
      contest_visibility: string;
      password: string;
      participant_type: string;
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
      name,
      slug,
      description,
      start_at,
      end_at,
      contest_visibility,
      password,
      participant_type,
    };

    return await Fetch.patch(`/author/contest/${id}`, data, _config);
  },

  // read problem from contest
  readProblem: async ({
    contest_id,
    token = "",
    context = null,
  }: {
    contest_id: number;
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

    return await Fetch.get(`/author/contest/${contest_id}/problem`, _config);
  },

  // add problem to contest
  addProblem: async (
    contest_id: number,
    {
      problem_id,
      max_score,
      sort_order,
    }: {
      problem_id: number;
      max_score: number;
      sort_order: string;
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
      problem_id,
      max_score,
      sort_order,
    };

    return await Fetch.post(
      `/author/contest/${contest_id}/problem`,
      data,
      _config
    );
  },
  // remove problem to contest
  removeProblem: async (id: number, contest_id: number, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(
      `/author/contest/${contest_id}/problem/${id}`,
      _config
    );
  },
};
