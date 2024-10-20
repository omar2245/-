const env = import.meta.env.MODE || "development";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi: "/api",
  },
};

export default {
  ...EnvConfig[env],
  mock: false,
};
