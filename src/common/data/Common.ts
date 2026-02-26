export const UpdatePolicy = {
    IGNORE: "ignore",
    INSERT: "insert",
} as const;

export type UpdatePolicy = (typeof UpdatePolicy)[keyof typeof UpdatePolicy];

export const InsertConflictPolicy = {
    REPLACE: "replace",
    IGNORE: "ignore",
} as const;
