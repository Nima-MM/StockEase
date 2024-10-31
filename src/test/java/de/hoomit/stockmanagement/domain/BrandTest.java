package de.hoomit.stockmanagement.domain;

import static de.hoomit.stockmanagement.domain.BrandTestSamples.*;
import static de.hoomit.stockmanagement.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import de.hoomit.stockmanagement.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BrandTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Brand.class);
        Brand brand1 = getBrandSample1();
        Brand brand2 = new Brand();
        assertThat(brand1).isNotEqualTo(brand2);

        brand2.setId(brand1.getId());
        assertThat(brand1).isEqualTo(brand2);

        brand2 = getBrandSample2();
        assertThat(brand1).isNotEqualTo(brand2);
    }

    @Test
    void productTest() {
        Brand brand = getBrandRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        brand.setProduct(productBack);
        assertThat(brand.getProduct()).isEqualTo(productBack);
        assertThat(productBack.getBrand()).isEqualTo(brand);

        brand.product(null);
        assertThat(brand.getProduct()).isNull();
        assertThat(productBack.getBrand()).isNull();
    }
}
