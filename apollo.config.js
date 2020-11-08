// apollo.config.js只是为了告诉我们用的apollo codegen
//（根据api生成typescript类型的东西）要怎么访问我们的API，拿到schema，来做codegen
module.exports = {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      url: "http://localhost:23333/v1/graphql",
    },
  },
};
