import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://staging.fleetpanda.com/graphql",
  documents: "src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/generated/graphql.tsx": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
      hooks: {
        afterOneFileWrite: ["eslint --ext .tsx --fix"],
      },
    },
  },
};

export default config;
