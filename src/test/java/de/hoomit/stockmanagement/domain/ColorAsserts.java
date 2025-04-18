package de.hoomit.stockmanagement.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ColorAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertColorAllPropertiesEquals(Color expected, Color actual) {
        assertColorAutoGeneratedPropertiesEquals(expected, actual);
        assertColorAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertColorAllUpdatablePropertiesEquals(Color expected, Color actual) {
        assertColorUpdatableFieldsEquals(expected, actual);
        assertColorUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertColorAutoGeneratedPropertiesEquals(Color expected, Color actual) {
        assertThat(expected)
            .as("Verify Color auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertColorUpdatableFieldsEquals(Color expected, Color actual) {
        assertThat(expected)
            .as("Verify Color relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertColorUpdatableRelationshipsEquals(Color expected, Color actual) {
        // empty method
    }
}
