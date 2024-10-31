package de.hoomit.stockmanagement.domain;

import static de.hoomit.stockmanagement.domain.ColorTestSamples.*;
import static de.hoomit.stockmanagement.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import de.hoomit.stockmanagement.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ColorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Color.class);
        Color color1 = getColorSample1();
        Color color2 = new Color();
        assertThat(color1).isNotEqualTo(color2);

        color2.setId(color1.getId());
        assertThat(color1).isEqualTo(color2);

        color2 = getColorSample2();
        assertThat(color1).isNotEqualTo(color2);
    }

    @Test
    void productTest() {
        Color color = getColorRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        color.setProduct(productBack);
        assertThat(color.getProduct()).isEqualTo(productBack);
        assertThat(productBack.getColor()).isEqualTo(color);

        color.product(null);
        assertThat(color.getProduct()).isNull();
        assertThat(productBack.getColor()).isNull();
    }
}
