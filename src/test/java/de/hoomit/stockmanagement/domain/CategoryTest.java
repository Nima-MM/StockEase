package de.hoomit.stockmanagement.domain;

import static de.hoomit.stockmanagement.domain.CategoryTestSamples.*;
import static de.hoomit.stockmanagement.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import de.hoomit.stockmanagement.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Category.class);
        Category category1 = getCategorySample1();
        Category category2 = new Category();
        assertThat(category1).isNotEqualTo(category2);

        category2.setId(category1.getId());
        assertThat(category1).isEqualTo(category2);

        category2 = getCategorySample2();
        assertThat(category1).isNotEqualTo(category2);
    }

    @Test
    void productTest() {
        Category category = getCategoryRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        category.setProduct(productBack);
        assertThat(category.getProduct()).isEqualTo(productBack);
        assertThat(productBack.getCategory()).isEqualTo(category);

        category.product(null);
        assertThat(category.getProduct()).isNull();
        assertThat(productBack.getCategory()).isNull();
    }
}
