module.exports = {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      url: "http://localhost:23333/v1/graphql",
    },
  },
};
