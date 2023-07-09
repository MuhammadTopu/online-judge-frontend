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

  // TODO: add problem
  addProblem: async (
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
};
