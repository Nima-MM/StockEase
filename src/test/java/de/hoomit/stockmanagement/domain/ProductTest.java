package de.hoomit.stockmanagement.domain;

import static de.hoomit.stockmanagement.domain.BrandTestSamples.*;
import static de.hoomit.stockmanagement.domain.CategoryTestSamples.*;
import static de.hoomit.stockmanagement.domain.ColorTestSamples.*;
import static de.hoomit.stockmanagement.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import de.hoomit.stockmanagement.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void categoryTest() {
        Product product = getProductRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        product.setCategory(categoryBack);
        assertThat(product.getCategory()).isEqualTo(categoryBack);

        product.category(null);
        assertThat(product.getCategory()).isNull();
    }

    @Test
    void brandTest() {
        Product product = getProductRandomSampleGenerator();
        Brand brandBack = getBrandRandomSampleGenerator();

        product.setBrand(brandBack);
        assertThat(product.getBrand()).isEqualTo(brandBack);

        product.brand(null);
        assertThat(product.getBrand()).isNull();
    }

    @Test
    void colorTest() {
        Product product = getProductRandomSampleGenerator();
        Color colorBack = getColorRandomSampleGenerator();

        product.setColor(colorBack);
        assertThat(product.getColor()).isEqualTo(colorBack);

        product.color(null);
        assertThat(product.getColor()).isNull();
    }
}
