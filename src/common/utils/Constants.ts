/**
 * Identifiers used in JSON string to distinguish between different object types
 * which are mangled when a class is stringified.
 *
 * It is recommended to use {@link JSON_IDENTIFIER_KEY} as key to keep a uniform interface.
 */
export const JSON_IDENTIFIERS = {
    VALUE_NODE: "value_node",
    GROUP_NODE: "group_node",
    REFERENCE_NODE: "reference_node",
}

/**
 * JSON key used for class/type-recognition when serializing and deserializing a class.
 */
export const JSON_IDENTIFIER_KEY = "__identifier"

