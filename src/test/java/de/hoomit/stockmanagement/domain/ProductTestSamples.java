package de.hoomit.stockmanagement.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProductTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Product getProductSample1() {
        return new Product().id(1L).stock(1L).name("name1").image("image1").ean("ean1").description("description1");
    }

    public static Product getProductSample2() {
        return new Product().id(2L).stock(2L).name("name2").image("image2").ean("ean2").description("description2");
    }

    public static Product getProductRandomSampleGenerator() {
        return new Product()
            .id(longCount.incrementAndGet())
            .stock(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .image(UUID.randomUUID().toString())
            .ean(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
